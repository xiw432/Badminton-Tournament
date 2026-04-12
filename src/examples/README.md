# Supabase Examples

## Quick Start

### 1. Add your API key to `.env.local`

Get it from: https://supabase.com/dashboard/project/xyrpcjnupcgntworlput/settings/api

### 2. Import and use the example

```jsx
import SupabaseExample from './examples/SupabaseExample'

function App() {
  return (
    <div>
      <h1>My App</h1>
      <SupabaseExample />
    </div>
  )
}
```

### 3. Start your dev server

```bash
npm run dev
```

## What You Can Do

The `SupabaseExample` component demonstrates:

- ✅ Connecting to Supabase
- ✅ Inserting data
- ✅ Querying data
- ✅ Deleting data
- ✅ Real-time subscriptions

## Next Steps

### Add Authentication

```jsx
import { supabase } from './supabaseClient'

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

### Query with Filters

```jsx
// Get items matching a condition
const { data } = await supabase
  .from('items')
  .select('*')
  .eq('name', 'Example')
  .limit(10)
```

### Use TypeScript Types

Generate types from your schema:

```bash
supabase gen types --linked > src/types/supabase.ts
```

Then use them:

```typescript
import { Database } from './types/supabase'

const supabase = createClient<Database>(url, key)
```
