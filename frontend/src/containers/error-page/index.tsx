
export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const error = useRouteError() as any

  return (
    <div id="error-page" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    }}>
      <h1 style={{
        color: 'white'
      }}>Oops!</h1>
    </div>
  );
}