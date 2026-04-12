import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

/**
 * Simple Supabase Example Component
 * 
 * This demonstrates:
 * 1. Creating a table (you'll need to do this in Supabase dashboard first)
 * 2. Inserting data
 * 3. Fetching data
 * 4. Real-time subscriptions
 */
export default function SupabaseExample() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch items on mount
  useEffect(() => {
    fetchItems()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('items-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'items' },
        (payload) => {
          console.log('Change received!', payload)
          fetchItems()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchItems() {
    setLoading(true)
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching items:', error)
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }

  async function addItem() {
    if (!newItem.trim()) return

    const { error } = await supabase
      .from('items')
      .insert([{ name: newItem }])

    if (error) {
      console.error('Error adding item:', error)
    } else {
      setNewItem('')
      fetchItems()
    }
  }

  async function deleteItem(id) {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting item:', error)
    } else {
      fetchItems()
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Supabase Example</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item name"
          style={{ padding: '8px', marginRight: '10px', width: '300px' }}
        />
        <button onClick={addItem} style={{ padding: '8px 16px' }}>
          Add Item
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li 
              key={item.id} 
              style={{ 
                padding: '10px', 
                marginBottom: '10px', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{item.name}</span>
              <button 
                onClick={() => deleteItem(item.id)}
                style={{ padding: '4px 12px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length === 0 && !loading && (
        <p style={{ color: '#666' }}>No items yet. Add one above!</p>
      )}
    </div>
  )
}
