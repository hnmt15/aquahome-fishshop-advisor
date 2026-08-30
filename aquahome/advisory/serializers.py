from rest_framework import serializers


class AdvisoryRequestSerializer(serializers.Serializer):
    tank_size = serializers.FloatField(min_value=0, required=False, allow_null=True, default=None)
    temperature = serializers.FloatField(required=False, allow_null=True, default=None)
    ph = serializers.FloatField(required=False, allow_null=True, default=None)
    has_plants = serializers.BooleanField(default=False)

    # scientific_name của các loài khách đang nuôi; [] hoặc bỏ trống -> bỏ qua Bước 2
    existing_species = serializers.ListField(
        child=serializers.CharField(), required=False, default=list
    )

    # Sở thích khách hàng dùng cho Bước 3 (Gower similarity)
    preferred_price = serializers.FloatField(required=False, allow_null=True, default=None)
    preferred_max_length = serializers.FloatField(required=False, allow_null=True, default=None)

    top_n = serializers.IntegerField(min_value=1, max_value=20, default=5)

    def to_customer_preferences(self):
        data = self.validated_data
        prefs = {}
        if data.get("preferred_price") is not None:
            prefs["price"] = data["preferred_price"]
        if data.get("preferred_max_length") is not None:
            prefs["max_length"] = data["preferred_max_length"]
        return prefs


class SpeciesResultSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    scientific_name = serializers.CharField()
    score = serializers.FloatField()
