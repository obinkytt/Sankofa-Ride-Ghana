
import { supabase } from "@/integrations/supabase/client";

export interface PaymentMethod {
  id: string;
  user_id: string;
  type: "mobile_money" | "credit_card" | "bank_card";
  provider: string;
  account_details: any;
  is_default: boolean;
  status: "active" | "pending" | "expired";
  created_at: string;
  updated_at: string;
}

export interface PaymentTransaction {
  id: string;
  user_id: string;
  ride_id?: string;
  amount: number;
  currency: string;
  payment_method_id: string;
  payment_type: "mobile_money" | "credit_card" | "bank_card" | "cash";
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  transaction_ref?: string;
  provider_response?: any;
  created_at: string;
  updated_at: string;
}

export interface MTNMoMoPaymentRequest {
  amount: string;
  currency: "GHS";
  externalId: string;
  payer: {
    partyIdType: "MSISDN";
    partyId: string; // Phone number
  };
  payerMessage: string;
  payeeNote: string;
}

export interface CardPaymentRequest {
  amount: number;
  currency: "GHS";
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
  description: string;
}

class PaymentService {
  // Get user's payment methods
  async getUserPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  }

  // Add new payment method
  async addPaymentMethod(userId: string, paymentData: {
    type: "mobile_money" | "credit_card" | "bank_card";
    provider: string;
    accountDetails: any;
    isDefault?: boolean;
  }): Promise<PaymentMethod> {
    try {
      // If this is being set as default, first update all others to non-default
      if (paymentData.isDefault) {
        await supabase
          .from('payment_methods')
          .update({ is_default: false })
          .eq('user_id', userId);
      }

      const { data, error } = await supabase
        .from('payment_methods')
        .insert([
          {
            user_id: userId,
            type: paymentData.type,
            provider: paymentData.provider,
            account_details: paymentData.accountDetails,
            is_default: paymentData.isDefault || false,
            status: 'active'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding payment method:', error);
      throw error;
    }
  }

  // Process MTN Mobile Money payment
  async processMTNMoMoPayment(paymentRequest: MTNMoMoPaymentRequest): Promise<any> {
    try {
      // In a real implementation, this would integrate with MTN MoMo API
      console.log('Processing MTN MoMo payment:', paymentRequest);
      
      // Simulate API call to MTN MoMo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response
      const mockResponse = {
        financialTransactionId: `mtn_${Date.now()}`,
        externalId: paymentRequest.externalId,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        payer: paymentRequest.payer,
        payerMessage: paymentRequest.payerMessage,
        payeeNote: paymentRequest.payeeNote,
        status: "SUCCESSFUL"
      };

      return mockResponse;
    } catch (error) {
      console.error('MTN MoMo payment error:', error);
      throw error;
    }
  }

  // Process Vodafone Cash payment
  async processVodafoneCashPayment(paymentRequest: any): Promise<any> {
    try {
      console.log('Processing Vodafone Cash payment:', paymentRequest);
      
      // Simulate API call to Vodafone Cash
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // Mock response
      const mockResponse = {
        transactionId: `voda_${Date.now()}`,
        reference: paymentRequest.reference,
        amount: paymentRequest.amount,
        currency: "GHS",
        status: "SUCCESS"
      };

      return mockResponse;
    } catch (error) {
      console.error('Vodafone Cash payment error:', error);
      throw error;
    }
  }

  // Process card payment (credit/debit cards)
  async processCardPayment(paymentRequest: CardPaymentRequest): Promise<any> {
    try {
      console.log('Processing card payment:', { ...paymentRequest, cardNumber: '****', cvv: '***' });
      
      // In real implementation, integrate with payment processor like Paystack, Flutterwave
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock response
      const mockResponse = {
        transactionId: `card_${Date.now()}`,
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        status: "success",
        reference: `TXN_${Date.now()}`,
        authorization: {
          authorization_code: `AUTH_${Date.now()}`,
          card_type: "visa",
          last4: paymentRequest.cardNumber.slice(-4),
          exp_month: paymentRequest.expiryMonth,
          exp_year: paymentRequest.expiryYear,
          bin: paymentRequest.cardNumber.substring(0, 6),
          bank: "Sample Bank"
        }
      };

      return mockResponse;
    } catch (error) {
      console.error('Card payment error:', error);
      throw error;
    }
  }

  // Create payment transaction record
  async createPaymentTransaction(transactionData: {
    userId: string;
    rideId?: string;
    amount: number;
    paymentMethodId: string;
    paymentType: "mobile_money" | "credit_card" | "bank_card" | "cash";
    transactionRef?: string;
    providerResponse?: any;
  }): Promise<PaymentTransaction> {
    try {
      const { data, error } = await supabase
        .from('payment_transactions')
        .insert([
          {
            user_id: transactionData.userId,
            ride_id: transactionData.rideId,
            amount: transactionData.amount,
            currency: 'GHS',
            payment_method_id: transactionData.paymentMethodId,
            payment_type: transactionData.paymentType,
            status: 'completed',
            transaction_ref: transactionData.transactionRef,
            provider_response: transactionData.providerResponse
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating payment transaction:', error);
      throw error;
    }
  }

  // Get user's transaction history
  async getUserTransactions(userId: string, limit = 50): Promise<PaymentTransaction[]> {
    try {
      const { data, error } = await supabase
        .from('payment_transactions')
        .select(`
          *,
          payment_methods!inner(provider, account_details)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }

  // Process ride payment
  async processRidePayment(rideId: string, userId: string, amount: number, paymentMethodId: string): Promise<{
    success: boolean;
    transaction?: PaymentTransaction;
    error?: string;
  }> {
    try {
      // Get payment method details
      const { data: paymentMethod, error: pmError } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('id', paymentMethodId)
        .eq('user_id', userId)
        .single();

      if (pmError || !paymentMethod) {
        throw new Error('Payment method not found');
      }

      let providerResponse;
      const transactionRef = `RIDE_${rideId}_${Date.now()}`;

      // Process payment based on method type
      switch (paymentMethod.type) {
        case 'mobile_money':
          if (paymentMethod.provider === 'MTN Mobile Money') {
            providerResponse = await this.processMTNMoMoPayment({
              amount: amount.toString(),
              currency: "GHS",
              externalId: transactionRef,
              payer: {
                partyIdType: "MSISDN",
                partyId: paymentMethod.account_details.phone
              },
              payerMessage: `Payment for ride ${rideId}`,
              payeeNote: "Sankofa Ride payment"
            });
          } else if (paymentMethod.provider === 'Vodafone Cash') {
            providerResponse = await this.processVodafoneCashPayment({
              reference: transactionRef,
              amount: amount,
              phone: paymentMethod.account_details.phone,
              description: `Payment for ride ${rideId}`
            });
          }
          break;

        case 'credit_card':
        case 'bank_card':
          // Note: In real implementation, you wouldn't store actual card details
          // This would use tokenized payment methods
          providerResponse = await this.processCardPayment({
            amount: amount,
            currency: "GHS",
            cardNumber: paymentMethod.account_details.cardNumber || '4111111111111111',
            expiryMonth: paymentMethod.account_details.expiryMonth || '12',
            expiryYear: paymentMethod.account_details.expiryYear || '25',
            cvv: '123',
            cardholderName: paymentMethod.account_details.cardholderName || 'Test User',
            description: `Payment for ride ${rideId}`
          });
          break;

        default:
          throw new Error('Unsupported payment method type');
      }

      // Create transaction record
      const transaction = await this.createPaymentTransaction({
        userId,
        rideId,
        amount,
        paymentMethodId,
        paymentType: paymentMethod.type,
        transactionRef,
        providerResponse
      });

      return {
        success: true,
        transaction
      };

    } catch (error: any) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: error.message || 'Payment processing failed'
      };
    }
  }

  // Calculate ride fare (basic implementation)
  calculateRideFare(distance: number, duration: number, rideType: 'standard' | 'premium' = 'standard'): {
    baseFare: number;
    distanceFare: number;
    timeFare: number;
    total: number;
    currency: string;
  } {
    const baseFare = rideType === 'premium' ? 5.00 : 3.00; // GHS
    const distanceRate = rideType === 'premium' ? 2.50 : 1.50; // GHS per km
    const timeRate = 0.25; // GHS per minute
    
    const distanceFare = distance * distanceRate;
    const timeFare = duration * timeRate;
    const total = baseFare + distanceFare + timeFare;

    return {
      baseFare,
      distanceFare,
      timeFare,
      total: parseFloat(total.toFixed(2)),
      currency: 'GHS'
    };
  }

  // Get payment analytics
  async getPaymentAnalytics(userId: string, userRole: 'rider' | 'driver'): Promise<any> {
    try {
      const { data: transactions, error } = await supabase
        .from('payment_transactions')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      const analytics = {
        totalTransactions: transactions?.length || 0,
        totalAmount: transactions?.reduce((sum, t) => sum + t.amount, 0) || 0,
        byPaymentType: {},
        monthlyData: {},
        recentTransactions: transactions?.slice(0, 10) || []
      };

      // Group by payment type
      transactions?.forEach(t => {
        if (!analytics.byPaymentType[t.payment_type]) {
          analytics.byPaymentType[t.payment_type] = { count: 0, amount: 0 };
        }
        analytics.byPaymentType[t.payment_type].count++;
        analytics.byPaymentType[t.payment_type].amount += t.amount;
      });

      return analytics;
    } catch (error) {
      console.error('Error fetching payment analytics:', error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService();
export default paymentService;
