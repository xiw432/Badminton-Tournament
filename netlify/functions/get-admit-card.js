/**
 * Get Admit Card Function
 * Retrieves or regenerates admit card for a player
 * Input: email or phone or playerId
 */

import { createClient } from '@supabase/supabase-js';
import { generateAdmitCardPDF } from './utils/pdfGenerator.js';

export const handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Parse query parameters or body
    let searchParam, searchValue;
    
    if (event.httpMethod === 'GET') {
      const params = event.queryStringParameters || {};
      if (params.email) {
        searchParam = 'email';
        searchValue = params.email;
      } else if (params.phone) {
        searchParam = 'phone';
        searchValue = params.phone;
      } else if (params.playerId) {
        searchParam = 'player_id';
        searchValue = params.playerId;
      }
    } else if (event.httpMethod === 'POST') {
      const data = JSON.parse(event.body);
      if (data.email) {
        searchParam = 'email';
        searchValue = data.email;
      } else if (data.phone) {
        searchParam = 'phone';
        searchValue = data.phone;
      } else if (data.playerId) {
        searchParam = 'player_id';
        searchValue = data.playerId;
      }
    }
    
    if (!searchParam || !searchValue) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Please provide email, phone, or playerId' 
        }),
      };
    }
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    
    // Find player
    const { data: player, error: fetchError } = await supabase
      .from('players')
      .select('*')
      .eq(searchParam, searchValue)
      .single();
    
    if (fetchError || !player) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ 
          error: 'Player not found',
          message: 'No registration found with the provided information'
        }),
      };
    }
    
    // Check if PDF already exists
    if (player.pdf_url) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: {
            playerId: player.player_id,
            name: player.name,
            email: player.email,
            phone: player.phone,
            dob: player.dob,
            gender: player.gender,
            category: player.category,
            parentName: player.parent_name,
            address: player.address,
            events: player.events,
            totalFee: player.total_fee,
            photoUrl: player.photo_url,
            pdfUrl: player.pdf_url,
          },
        }),
      };
    }
    
    // Regenerate PDF if not exists
    const pdfData = {
      playerId: player.player_id,
      name: player.name,
      email: player.email,
      phone: player.phone,
      dob: player.dob,
      gender: player.gender,
      category: player.category,
      parentName: player.parent_name,
      address: player.address,
      events: player.events,
      totalFee: player.total_fee || 0,
    };
    
    const pdfBytes = await generateAdmitCardPDF(pdfData);
    
    // Upload PDF to Supabase Storage
    const pdfFileName = `admit-cards/${player.player_id}.pdf`;
    const { error: uploadError } = await supabase.storage
      .from('player-documents')
      .upload(pdfFileName, pdfBytes, {
        contentType: 'application/pdf',
        upsert: true,
      });
    
    if (uploadError) {
      console.error('PDF upload error:', uploadError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to generate PDF' }),
      };
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('player-documents')
      .getPublicUrl(pdfFileName);
    
    // Update player record
    await supabase
      .from('players')
      .update({ pdf_url: publicUrl })
      .eq('player_id', player.player_id);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          playerId: player.player_id,
          name: player.name,
          email: player.email,
          phone: player.phone,
          dob: player.dob,
          gender: player.gender,
          category: player.category,
          parentName: player.parent_name,
          address: player.address,
          events: player.events,
          totalFee: player.total_fee,
          photoUrl: player.photo_url,
          pdfUrl: publicUrl,
        },
      }),
    };
    
  } catch (error) {
    console.error('Get admit card error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to retrieve admit card',
        message: error.message 
      }),
    };
  }
};
