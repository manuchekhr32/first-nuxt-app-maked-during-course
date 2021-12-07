export default function( context ) {
  console.log('check-auth.js');
  context.store.dispatch('initAuth', context.req)
}