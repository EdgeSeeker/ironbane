angular
    .module('prefabs.sign', [])
    .factory('SignPrefab', [
        function() {
            'use strict';

            return function(entityData) {
                var customs = entityData.userData || {},
                    assembly = {
                        components: {
                            sign: {
                                type: 'oneline',
                                message: 'Hello'
                            }
                        }
                    };

                return assembly;
            };
        }
    ]);
