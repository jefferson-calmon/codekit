import * as hooks from './hooks';
export * from './hooks';

import * as validations from './validations';
export * from './validations';

import * as forms from './forms';
export * from './forms';

import * as utils from './utils';
export * from './utils';

import * as config from './config';
export * from './config';

import * as types from './types';
export * from './types';

const pandora = {
    ...hooks,
    ...validations,
    ...forms,
    ...utils,
    ...config,
    ...types,
};

export default pandora;
