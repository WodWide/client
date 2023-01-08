export default function ({ store, redirect }) {
  if (!store.state.user.authStatus) {
    return redirect("/login");
  }
}
