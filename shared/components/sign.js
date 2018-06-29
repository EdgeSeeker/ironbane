angular
    .module('components.sign', ['ces'])
    .config([
        '$componentsProvider',
        function($componentsProvider) {
            'use strict';

            $componentsProvider.register({
                'sign': {
                    type: 'oneline',
                    message: 'Hello'
                }
            });
        }
    ]);
