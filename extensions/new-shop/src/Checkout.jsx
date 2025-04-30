// import {useEffect, useState} from 'react';
// import {
//   useApi,
//   reactExtension,
//   BlockStack,
//   TextBlock,
//   Image,
// } from '@shopify/ui-extensions-react/checkout';

// export default reactExtension(
//   'purchase.checkout.block.render',
//   () => <Extension />,
// );

// function Extension() {
//   const [data, setData] = useState();
//   const {query} = useApi();

//   useEffect(() => {
//     query(`
//       query getProduct($handle: String!) {
//         productByHandle(handle: $handle) {
//           id
//           title
//           description
//           featuredImage {
//             url
//           }
//           variants(first: 1) {
//             nodes {
//               price {
//                 amount
//                 currencyCode
//               }
//             }
//           }
//         }
//       }
//     `, {
//       variables: {
//         handle: "mango-time"
//       }
//     })
//     .then(({data, errors}) => setData(data))
//     .catch(console.error);
//   }, [query]);

//   const product = data?.productByHandle;

//   return (
//     <BlockStack spacing="loose">
//       <TextBlock>{product?.title}</TextBlock>
//       {product?.featuredImage?.url && (
//         <Image
//           source={product.featuredImage.url}
//           description={product.title}
//           border="base"
//           borderRadius="base"
//           fit="cover"
//           width="200px"
//           height="200px"
//         />
//       )}
//       <TextBlock emphasized>
//         {product?.variants?.nodes?.[0]?.price?.amount}{" "}
//         {product?.variants?.nodes?.[0]?.price?.currencyCode}
//       </TextBlock>
//     </BlockStack>
//   );
// }


import {
  reactExtension,
  useApi,
  Button,
  Image,
  Link,
  Modal,
  TextBlock,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const [data, setData] = useState();
  const { ui, query } = useApi();

  useEffect(() => {
    query(`
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          featuredImage {
            url
          }
          variants(first: 1) {
            nodes {
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `, {
      variables: {
        handle: "mango-time-1"
      }
    })
      .then(({ data, errors }) => setData(data))
      .catch(console.error);
  }, [query]);

  const product = data?.productByHandle;

  return (
    <Button
      overlay={
        <Modal
          id="my-modal"
          padding
          title={product?.title}
        >
          {product?.featuredImage?.url && (
            <Image
              source={product.featuredImage.url}
              description={product.title}
              border="base"
              borderRadius="base"
              fit="cover"
              width="200px"
              height="200px"
            />
          )}

          <TextBlock emphasized>
            {product?.variants?.nodes?.[0]?.price?.amount}{" "}
            {product?.variants?.nodes?.[0]?.price?.currencyCode}
          </TextBlock>

          <Button
            onPress={() =>
              ui.overlay.close('my-modal')
            }
          >
            Close
          </Button>
        </Modal>
      }
    >
      View Product
    </Button>
  );
}
