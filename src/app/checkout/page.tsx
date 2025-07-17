"use client";

import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";
import Link from "next/link";

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });
  
  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  
  const [billingAddress, setBillingAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.08; // 8% tax
  const shipping = totalPrice > 50 ? 0 : 10; // Free shipping over $50
  const finalTotal = totalPrice + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customerEmail: customerInfo.email,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerPhone: customerInfo.phone,
        shippingAddress: JSON.stringify(shippingAddress),
        billingAddress: JSON.stringify(sameAsShipping ? shippingAddress : billingAddress),
        subtotal: totalPrice,
        tax,
        shipping,
        total: finalTotal,
        paymentMethod,
        orderItems: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          color: item.color,
        })),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className={cn([integralCF.className, "text-3xl font-bold"])}>
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                    <Truck className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="shippingStreet">Street Address *</Label>
                    <Input
                      id="shippingStreet"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">City *</Label>
                      <Input
                        id="shippingCity"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingState">State *</Label>
                      <Input
                        id="shippingState"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingZip">ZIP Code *</Label>
                      <Input
                        id="shippingZip"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingCountry">Country *</Label>
                      <Input
                        id="shippingCountry"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsShipping"
                      checked={sameAsShipping}
                      onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
                    />
                    <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                  </div>
                  
                  {!sameAsShipping && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="billingStreet">Street Address *</Label>
                        <Input
                          id="billingStreet"
                          value={billingAddress.street}
                          onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingCity">City *</Label>
                          <Input
                            id="billingCity"
                            value={billingAddress.city}
                            onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingState">State *</Label>
                          <Input
                            id="billingState"
                            value={billingAddress.state}
                            onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingZip">ZIP Code *</Label>
                          <Input
                            id="billingZip"
                            value={billingAddress.zipCode}
                            onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingCountry">Country *</Label>
                          <Input
                            id="billingCountry"
                            value={billingAddress.country}
                            onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="apple-pay" id="apple-pay" />
                      <Label htmlFor="apple-pay">Apple Pay</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={`${item.id}-${item.color}-${index}`} className="flex gap-3">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                          <Image
                            src={item.srcUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{item.title}</h4>
                          {item.color && (
                            <p className="text-xs text-muted-foreground">Color: {item.color}</p>
                          )}
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                            <span className="text-sm font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₦{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `₦${shipping.toLocaleString()}`}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₦{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : `Complete Order - ₦${finalTotal.toLocaleString()}`}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
