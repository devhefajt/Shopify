


import {
  reactExtension,
  BlockStack,
  Text,
  Image,
  InlineStack,
  View,
  Banner,
  Icon
} from '@shopify/ui-extensions-react/checkout';

const benefits = [
  { title: 'Free shipping', subtitle: 'No shipping cost', icon: 'Truck', },
  { title: 'Easy returns', subtitle: '30-day policy', icon: 'star', },
  { title: 'Secure checkout', subtitle: 'SSL protected', icon: 'discount', },
];



export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  return (
    <View border="base"
      padding="base"
      borderRadius="large"
      background="surface-secondary">

      <Banner status="success">
        <BlockStack spacing="loose">
          <Text size="large" emphasis="bold">
            Trusted by 150k+ Customers
          </Text>

          {benefits.map((benefit, index) => (
            <InlineStack key={index} spacing="base" blockAlignment="center">
              <View
                padding="base"
                border="base"
                borderRadius="full"
                inlineAlignment="center"
              >
                <Icon source={benefit.icon} size="base" />
              </View>
              <BlockStack spacing="none">
                <Text emphasis="bold">{benefit.title}</Text>
                <Text size="small">{benefit.subtitle}</Text>
              </BlockStack>
            </InlineStack>
          ))}
        </BlockStack>
      </Banner>
    </View>
  );
}