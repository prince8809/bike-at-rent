#!/bin/bash

API_URL="http://localhost:8080/api/v1/bikes"

cat bikes.json | jq -c '.[]' | while read bike; do
  echo "Creating bike: $(echo $bike | jq -r '.name')"

  curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "$bike"

  echo ""
done
