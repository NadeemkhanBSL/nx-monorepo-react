// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

export function App({searchText,handleBadgeCount}:{searchText:string,handleBadgeCount:any}) {
  return (
    <>
      <NxWelcome  searchText={searchText} handleBadgeCount={handleBadgeCount}/>

      <div />
    </>
  );
}

export default App;
