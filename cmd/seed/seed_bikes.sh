#!/bin/sh

set -e

API_BASE_URL="${API_BASE_URL:-http://localhost:8080}"
API_ENDPOINT="$API_BASE_URL/api/bikes"

if [ ! -f bike_test_data.json ]; then
  echo "❌ bike_test_data.json not found"
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "❌ jq is required but not installed"
  exit 1
fi

echo "🚀 Seeding bikes to $API_ENDPOINT"

BIKES=$(jq -c '.bikes[]' bike_test_data.json)

for bike in $BIKES; do
  payload=$(echo "$bike" | jq '. + {status:"available"}')

  response=$(curl -s -w "%{http_code}" -o /tmp/resp.json \
    -X POST "$API_ENDPOINT" \
    -H "Content-Type: application/json" \
    ${API_AUTH_TOKEN:+-H "Authorization: Bearer $API_AUTH_TOKEN"} \
    -d "$payload")

  if [ "$response" -ne 200 ] && [ "$response" -ne 201 ]; then
    echo "❌ Failed to insert:"
    echo "$payload"
    cat /tmp/resp.json
    exit 1
  fi

  name=$(echo "$payload" | jq -r '.name')
  echo "✅ Inserted: $name"
done

echo "🎉 All bikes seeded successfully"
