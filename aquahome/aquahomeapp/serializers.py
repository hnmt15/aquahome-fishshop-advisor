from .models import User, Category, Product, Order, OrderItem
from rest_framework import serializers

class AvatarFullNameMixin:
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.avatar:
            data['avatar'] = instance.avatar.url
        data['full_name'] = f"{instance.first_name} {instance.last_name}".strip()
        return data
class UserSerializer(serializers.ModelSerializer, AvatarFullNameMixin):
    class Meta:
        model = User
        fields = ['username', 'email', 'phone', 'avatar', 'role', 'is_active']
        read_only_fields = ['role', 'is_active']
class AdminUpdateSerializer(serializers.ModelSerializer, AvatarFullNameMixin):
    class Meta:
        model = User
        fields = ['username', 'email', 'phone', 'avatar', 'role', 'is_active']
class UserRegisterSerializer(serializers.ModelSerializer, AvatarFullNameMixin):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["username", "email","password", "first_name", "last_name","phone", 'avatar']
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
class StaffCreateSerializer(serializers.ModelSerializer, AvatarFullNameMixin):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ["username", "email","password", "first_name", "last_name","phone"]
    def create(self, validated_data):
        user = User.objects.create_user(role= User.RoleChoices.STAFF, is_staff=True, **validated_data)
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    read_only_fields = ['created_at', 'updated_at', 'is_active']
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.image:
            data['image'] = instance.image.url
        return data
class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'image', 'quantity']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.image:
            data['image'] = instance.image.url
        return data
class ProductDetailSerializer(ProductListSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Product
        fields = ProductListSerializer.Meta.fields + ['category','description']

class OrderItemSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    class Meta:
        model = Order
        fields = ['customer_name', 'customer_phone', 'customer_address', 'notes', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')

        total_amount = 0
        for item in items_data:
            product = item['product']
            quantity = item['quantity']
            total_amount += product.price * quantity

        order = Order.objects.create(
            total_amount=total_amount,
            **validated_data
        )
        for item in items_data:
            product = item['product']
            quantity = item['quantity']
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price=product.price
            )
        return order

#Cho khách hàng sửa thông tin nhận hàng
class OrderUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['customer_name', 'customer_phone', 'customer_address', 'notes']

#Cho Admin/Staff cập nhật
class OrderStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['status']

    def validate_status(self, new_status):
        order = self.instance
        current_status = order.status

        if current_status in [Order.StatusChoices.CANCELLED]:
            raise serializers.ValidationError(f"Đơn hàng đã ở trạng thái '{current_status}', không thể thay đổi thêm.")
        valid_transitions = {
            Order.StatusChoices.PENDING: [Order.StatusChoices.PROCESSING, Order.StatusChoices.CANCELLED],
            Order.StatusChoices.PROCESSING: [Order.StatusChoices.DELIVERED, Order.StatusChoices.CANCELLED],
            Order.StatusChoices.DELIVERED: [Order.StatusChoices.REFUNDED],
        }

        allowed_next_statuses = valid_transitions.get(current_status, [])
        if new_status != current_status and new_status not in allowed_next_statuses:
            raise serializers.ValidationError(
                f"Không thể chuyển trạng thái từ '{current_status}' sang '{new_status}'."
            )
        return new_status

class OrderListSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'items', 'total_amount', 'status']

class OrderDetailSerializer(OrderListSerializer):
    class Meta:
        model = Order
        fields = OrderListSerializer.Meta.fields + ['customer_name', 'customer_phone', 'customer_address', 'notes', 'created_at', 'updated_at']




