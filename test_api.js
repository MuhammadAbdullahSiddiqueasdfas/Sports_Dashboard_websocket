// Using built-in fetch (Node.js 18+)

async function testApi() {
  const baseUrl = 'http://localhost:8000';
  
  console.log('🚀 Starting Automatic API Test...\n');

  try {
    // 1. Test Matches
    console.log('--- Testing /matches ---');
    const matchesRes = await fetch(`${baseUrl}/matches`);
    const matchesData = await matchesRes.json();
    
    if (matchesData.data && matchesData.data.length > 0) {
      console.log(`✅ Success! Found ${matchesData.data.length} matches.`);
      matchesData.data.forEach(m => {
        console.log(`   - [${m.sport}] ${m.homeTeam} vs ${m.awayTeam} (${m.status})`);
      });
      
      // 2. Test Commentary for the first match
      const firstMatchId = matchesData.data[0].id;
      console.log(`\n--- Testing /matches/${firstMatchId}/commentary ---`);
      const commRes = await fetch(`${baseUrl}/matches/${firstMatchId}/commentary`);
      const commData = await commRes.json();
      
      if (commData.success && commData.data.length > 0) {
        console.log(`✅ Success! Found ${commData.data.length} commentary items.`);
        commData.data.forEach(c => {
          console.log(`   - [Minute ${c.minute}] ${c.actor}: ${c.message}`);
        });
      } else {
        console.log('⚠️ No commentary found for this match.');
      }
    } else {
      console.log('❌ No matches found.');
    }

  } catch (error) {
    console.error('❌ Test failed: Could not connect to the server. Make sure "npm run dev" is running.');
  }
}

testApi();
