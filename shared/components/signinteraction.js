angular
    .module('components.signinteraction', ['ces'])
    .config([
        '$componentsProvider',
        function($componentsProvider) {
            'use strict';

            $componentsProvider.register({
                'sign': {
                    sign: null
                }
            });
        }
    ]);
