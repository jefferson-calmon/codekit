import * as validations from './validations';
export * from './validations';

import * as forms from './forms';
export * from './forms';

import * as utils from './utils';
export * from './utils';

import * as config from './config';
export * from './config';

const pandora = {
    ...validations,
    ...forms,
    ...utils,
    ...config
};

export default pandora;
