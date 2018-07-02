angular
    .module('components.signinteraction', ['ces'])
    .config([
        '$componentsProvider',
        function($componentsProvider) {
            'use strict';

            $componentsProvider.register({
                'signinteraction': {
                    sign: 'Hello'
                }
            });
        }
    ]);
