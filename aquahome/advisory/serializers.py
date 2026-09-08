from rest_framework import serializers


class AdvisoryRequestSerializer(serializers.Serializer):
    tank_size = serializers.FloatField(
        min_value=0,
        required=False,
        allow_null=True,
        default=None
    )

    temperature = serializers.FloatField(
        required=False,
        allow_null=True,
        default=None
    )

    ph = serializers.FloatField(
        required=False,
        allow_null=True,
        default=None
    )

    has_plants = serializers.BooleanField(default=False)

    existing_species = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        default=list
    )

    preferred_price = serializers.FloatField(
        required=False,
        allow_null=True,
        default=None
    )

    preferred_max_length = serializers.FloatField(
        required=False,
        allow_null=True,
        default=None
    )

    preferred_temperament = serializers.ChoiceField(
        choices=[
            "Ôn hòa",
            "Bán hung dữ",
            "Hung dữ"
        ],
        required=False,
        allow_null=True,
        default=None,
    )

    preferred_layer = serializers.ChoiceField(
        choices=[
            "Tầng mặt",
            "Tầng giữa",
            "Tầng đáy"
        ],
        required=False,
        allow_null=True,
        default=None,
    )

    preferred_social = serializers.ChoiceField(
        choices=[
            "Sống theo đàn",
            "Nuôi đơn độc"
        ],
        required=False,
        allow_null=True,
        default=None,
    )

    top_n = serializers.IntegerField(
        min_value=1,
        max_value=20,
        default=5
    )

    def to_customer_preferences(self):
        data = self.validated_data

        prefs = {}

        if data.get("preferred_price") is not None:
            prefs["price"] = data["preferred_price"]

        if data.get("preferred_max_length") is not None:
            prefs["max_length"] = data["preferred_max_length"]

        if data.get("preferred_temperament") is not None:
            prefs["temperament"] = data["preferred_temperament"]

        if data.get("preferred_layer") is not None:
            prefs["layer"] = data["preferred_layer"]

        if data.get("preferred_social") is not None:
            prefs["social"] = data["preferred_social"]

        return prefs