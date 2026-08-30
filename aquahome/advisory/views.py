from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .engine import recommend
from .serializers import AdvisoryRequestSerializer


class AdvisoryRecommendView(APIView):
    def post(self, request):
        serializer = AdvisoryRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        result = recommend(
            tank_size=data.get("tank_size"),
            temperature=data.get("temperature"),
            ph=data.get("ph"),
            has_plants=data["has_plants"],
            existing_species_names=data.get("existing_species") or [],
            customer_preferences=serializer.to_customer_preferences(),
            top_n=data["top_n"],
        )

        payload = {
            "results": [
                {
                    "id": item["species"].id,
                    "name": item["species"].name_vn,
                    "scientific_name": item["species"].scientific_name,
                    "score": item["score"],
                    "product": (
                        {
                            "id": item["product"].id,
                            "name": item["product"].name,
                            "price": float(item["product"].price),
                        }
                        if item["product"]
                        else None
                    ),
                }
                for item in result["results"]
            ],
        }
        return Response(payload, status=status.HTTP_200_OK)