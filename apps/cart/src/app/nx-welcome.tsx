/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */

export function NxWelcome() {
  const item = sessionStorage.getItem("cartItem")
  const result = item ? JSON.parse(item) : undefined
  console.log("result",result)
  console.log("item",item)
  return (
    <>
      <h1>Cart</h1>
    </>
  );
}

export default NxWelcome;
