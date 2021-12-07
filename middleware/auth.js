export default function( context ) {
  console.log('Middleware auth is working');
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/admin/auth')
  }
}