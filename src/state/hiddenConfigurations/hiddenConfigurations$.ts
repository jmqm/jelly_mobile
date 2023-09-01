import { observable } from '@legendapp/state';
import type THiddenConfigurations from './THiddenConfigurations';

const hiddenConfigurations$ = observable<THiddenConfigurations>({ } as THiddenConfigurations);

export default hiddenConfigurations$;
