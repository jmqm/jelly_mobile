import { useContext } from 'react';
import ServerInfoContext from './ServerInfoContext';

const useServerInfo = () => useContext(ServerInfoContext);

export default useServerInfo;
