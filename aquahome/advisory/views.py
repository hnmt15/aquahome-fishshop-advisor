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

        return Response(result, status=status.HTTP_200_OK)