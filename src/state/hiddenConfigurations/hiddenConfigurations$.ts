import { observable } from '@legendapp/state';
import THiddenConfigurations from './THiddenConfigurations';

const hiddenConfigurations$ = observable<THiddenConfigurations>({ } as THiddenConfigurations);

export default hiddenConfigurations$;
