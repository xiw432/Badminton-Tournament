/**
 * Register Player Function
 * Handles complete registration workflow:
 * 1. Validate data
 * 2. Store in Supabase
 * 3. Generate PDF
 * 4. Upload PDF to storage
 * 5. Send email
 */

import { createClient } from '@supabase/supabase-js';
import { generateAdmitCardPDF } from './utils/pdfGenerator.js';
import { sendRegistrationEmail } from './utils/emailService.js';

export const handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'dob', 'gender', 'category', 'events'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: `Missing required field: ${field}` }),
        };
      }
    }
    
    // Initialize Supabase client with service role key
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Check for duplicate email
    const { data: existingPlayer } = await supabase
      .from('players')
      .select('id, email')
      .eq('email', data.email)
      .single();
    
    if (existingPlayer) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ 
          error: 'Email already registered',
          playerId: existingPlayer.id 
        }),
      };
    }
    
    // Generate unique Player ID
    const playerId = `LKO2026-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Prepare player data
    const playerData = {
      player_id: playerId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      gender: data.gender,
      category: data.category,
      parent_name: data.parentName || null,
      address: data.address || null,
      events: data.events,
      total_fee: data.totalFee || 0,
      photo_url: data.photoUrl || null,
      payment_mode: 'cash',
      payment_status: 'pending',
      created_at: new Date().toISOString(),
    };
    
    // Insert player into database
    const { error: insertError } = await supabase
      .from('players')
      .insert([playerData])
      .select()
      .single();
    
    if (insertError) {
      console.error('Database insert error:', insertError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to save registration data' }),
      };
    }
    
    // Generate Admit Card PDF
    const pdfData = {
      playerId: playerId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      gender: data.gender,
      category: data.category,
      parentName: data.parentName,
      address: data.address,
      events: data.events,
      totalFee: data.totalFee || 0,
    };
    
    const pdfBytes = await generateAdmitCardPDF(pdfData);
    
    // Upload PDF to Supabase Storage
    const pdfFileName = `admit-cards/${playerId}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('player-documents')
      .upload(pdfFileName, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });
    
    if (uploadError) {
      console.error('PDF upload error:', uploadError);
      // Continue even if PDF upload fails
    }
    
    // Get public URL for PDF
    let pdfUrl = null;
    if (uploadData) {
      const { data: { publicUrl } } = supabase.storage
        .from('player-documents')
        .getPublicUrl(pdfFileName);
      pdfUrl = publicUrl;
      
      // Update player record with PDF URL
      await supabase
        .from('players')
        .update({ pdf_url: pdfUrl })
        .eq('player_id', playerId);
    }
    
    // Send email with PDF attachment
    try {
      const pdfBuffer = Buffer.from(pdfBytes);
      await sendRegistrationEmail(pdfData, pdfBuffer, process.env.RESEND_API_KEY);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the registration if email fails
    }
    
    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Registration successful',
        data: {
          playerId: playerId,
          name: data.name,
          email: data.email,
          category: data.category,
          pdfUrl: pdfUrl,
        },
      }),
    };
    
  } catch (error) {
    console.error('Registration error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Registration failed',
        message: error.message 
      }),
    };
  }
};
