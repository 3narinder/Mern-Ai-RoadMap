# Backend Testing Guide

## Prerequisites

Make sure MongoDB is running. If not, run in a terminal:
```bash
mongod --dbpath ~/mongodb-data
```

## Test 1: Server Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-05-28T..."}
```

---

## Test 2: Load Initial Progress (Should be empty)

```bash
curl http://localhost:5000/api/progress
```

Expected response:
```json
{
  "checks": {},
  "completionDates": {},
  "dailyActivity": []
}
```

---

## Test 3: Toggle a Checkbox (Mark as Complete)

```bash
curl -X POST http://localhost:5000/api/progress/toggle \
  -H "Content-Type: application/json" \
  -d '{"id":"item-1","completed":true}'
```

Expected response:
```json
{
  "success": true,
  "completedAt": "2026-05-28T11:22:14.908Z",
  "dailyActivity": [
    {
      "date": "2026-05-28",
      "count": 1
    }
  ]
}
```

---

## Test 4: Load Progress Again (Should show item-1 checked)

```bash
curl http://localhost:5000/api/progress
```

Expected response:
```json
{
  "checks": {
    "item-1": true
  },
  "completionDates": {
    "item-1": "2026-05-28T11:22:14.908Z"
  },
  "dailyActivity": [
    {
      "date": "2026-05-28",
      "count": 1
    }
  ]
}
```

---

## Test 5: Toggle Same Checkbox Back (Mark as Incomplete)

```bash
curl -X POST http://localhost:5000/api/progress/toggle \
  -H "Content-Type: application/json" \
  -d '{"id":"item-1","completed":false}'
```

Expected response:
```json
{
  "success": true,
  "completedAt": null,
  "dailyActivity": [
    {
      "date": "2026-05-28",
      "count": 1
    }
  ]
}
```

---

## Test 6: Load Progress (item-1 should be false)

```bash
curl http://localhost:5000/api/progress
```

Expected response:
```json
{
  "checks": {
    "item-1": false
  },
  "completionDates": {},
  "dailyActivity": [
    {
      "date": "2026-05-28",
      "count": 1
    }
  ]
}
```

---

## Test 7: Save All Checkboxes at Once (Full Sync)

```bash
curl -X PUT http://localhost:5000/api/progress \
  -H "Content-Type: application/json" \
  -d '{
    "checks": {
      "item-1": true,
      "item-2": true,
      "item-3": false
    },
    "completionDates": {
      "item-1": "2026-05-28T10:00:00.000Z",
      "item-2": "2026-05-28T11:00:00.000Z"
    },
    "dailyActivity": []
  }'
```

Expected response:
```json
{"success": true}
```

---

## Test 8: Get Activity Data

```bash
curl http://localhost:5000/api/progress/activity
```

Expected response:
```json
{
  "dailyActivity": [
    {
      "date": "2026-05-28",
      "count": 1
    }
  ]
}
```

---

## Test 9: Clear All Progress

```bash
curl -X DELETE http://localhost:5000/api/progress
```

Expected response:
```json
{"success": true}
```

---

## Test 10: Verify Data is Cleared

```bash
curl http://localhost:5000/api/progress
```

Expected response:
```json
{
  "checks": {},
  "completionDates": {},
  "dailyActivity": []
}
```

---

## Quick Test Script

Copy this and run in terminal (with backend running):

```bash
echo "🧪 Test 1: Health Check"
curl -s http://localhost:5000/api/health | jq .

echo -e "\n🧪 Test 2: Load Empty Progress"
curl -s http://localhost:5000/api/progress | jq .

echo -e "\n🧪 Test 3: Toggle Item 1"
curl -s -X POST http://localhost:5000/api/progress/toggle \
  -H "Content-Type: application/json" \
  -d '{"id":"item-1","completed":true}' | jq .

echo -e "\n🧪 Test 4: Load Progress (should have item-1)"
curl -s http://localhost:5000/api/progress | jq .

echo -e "\n✅ All tests completed!"
```

---

## Debugging Tips

### Backend won't start?

Check logs:
```bash
cat /tmp/server.log
```

Common issues:
- Port 5000 already in use: `lsof -i :5000`
- MongoDB not running: `mongosh` (to test)
- Missing dependencies: `npm install`

### MongoDB connection error?

```bash
mongosh
db.adminCommand('ping')  # Should return ok: 1
```

### API requests failing?

Check MongoDB is really connected:
```bash
mongosh roadmap-dev
db.progresses.find().pretty()
```

---

## Next Steps

Once all tests pass:
1. Start frontend: `./frontend.sh`
2. Open http://localhost:5173
3. Toggle checkboxes
4. Reload page - data should persist! ✅

