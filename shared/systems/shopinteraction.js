angular
    .module('systems.shopinteraction', [
        'ces',
        'three',
        'engine.entity-builder',
        'engine.util',
        'engine.timing',
        'game.services.globalsound',
        'global.constants.inv',
        'services.items'
    ])
    .factory('ShopInteractionSystem', [
        '$log',
        'System',
        'Signal',
        'EntityBuilder',
        'IbUtils',
        'Timer',
        '$components',
        'THREE',
        'GlobalSound',
        'INV_SLOTS',
        'ItemService',
        'INV_TYPES',
        function($log, System, Signal, EntityBuilder, IbUtils, Timer, $components, THREE, GlobalSound, INV_SLOTS, ItemService, INV_TYPES) {
            'use strict';

            var armorList = INV_SLOTS.armorList;
            var slotList = INV_SLOTS.slotList;

            var invSlotList = armorList.concat(slotList);

            var SignInteractionSystem = System.extend({
                init: function() {
                    this._super();

                    this.onEquipItem = new Signal();
                    this.onItemAdded = new Signal();
                    this.onItemRemoved = new Signal();

                    this._signTimer = new Timer(0.01);

                    this.closeSign = null;
                },
                addedToWorld: function(world) {
                    this._super(world);

                    var me = this;

                    world.entityAdded('shopinteraction').add(function(entity) {
                        var inventoryComponent = entity.getComponent('shopinteraction');
                        world.publish('shopinteraction:load', entity);
                    });

                    world.subscribe('sign:read', function(entity, sign) {
                        me.readSign(entity, sign);
                    });

                    world.subscribe('shopinteraction:open', function(entity, pickup) {
                        var particle = EntityBuilder.build('particle', {
                            components: {
                                particleEmitter: {
                                    group: {
                                        texture: 'images/particles/small.png',
                                        hasPerspective: true,
                                        colorize: true,
                                        // depthWrite: true,
                                        blending: THREE.NormalBlending,
                                        maxAge: 1.0
                                    },
                                    emitter: {
                                        type: 'cube',

                                        acceleration: [0, 0, 0],
                                        // accelerationSpread: [0.2, 0.2, 0.2],
                                        positionSpread: [0.2, 0.2, 0.2],
                                        velocity: [0, 0, 0],
                                        velocitySpread: [2, 2, 2],
                                        duration: 0.2,

                                        sizeStart: 0.3,
                                        // sizeEnd: 3.0,
                                        opacityStart: 1.0,
                                        // opacityMiddle: 0.0,
                                        opacityEnd: 0,
                                        colorStart: '#5fff72',
                                        // colorStartFn: colorfn,
                                        // colorMiddleFn: colorfn,
                                        // colorEndFn: colorfn,
                                        // colorStartSpread: new THREE.Vector3(0.1, 0.1, 0.1),
                                        // colorMiddle: '#1480ff',
                                        // colorEnd: '#14feff',
                                        particleCount: 10
                                    }
                                },
                                lifespan: {
                                    duration: 5
                                }
                            }
                        });

                        particle.position.copy(pickup.position);
                        world.addEntity(particle);

                        //world.removeEntity(pickup);
                    });
                },
                readSign: function(entity, sign) {
                    var inventoryComponent = entity.getComponent('shopinteraction');

                    if (!inventoryComponent) {
                        return;
                    }

                    if (Meteor.isServer) {
                        me.world.publish('shop:message', entity, sign);
                    } 
                },
                update: function() {

                    var me = this;

                    var invSystem = this;

                    if (Meteor.isClient) {
                        if (interactionSystem._interactionTimer.isExpired) {
                            me.closeSign = null;
                            //$log.debug('pickup scan');

                            var grabbers = this.world.getEntities('shopinteraction', 'player'),
                            signs = this.world.getEntities('shop');

                            grabbers.forEach(function(entity) {

                                signs.sort(function(a, b) {
                                    return a.position.distanceToSquared(entity.position) - b.position.distanceToSquared(entity.position);
                                });

                                signs.forEach(function(sign) {
                                    //$log.debug('pickup hunting: ', entity, pickups);
                                    if (entity.position.inRangeOf(sign.position, 1.0)) {
                                        if (sign.getComponent('shop').item.type === 'oneline') {
                                            me.world.publish('shop:message', entity, sign);
                                        }
                                        else {
                                            me.closeSign = sign;
                                        }
                                    }
                                });
                            });

                            interactionSystem._signTimer.reset();
                        }
                    }
                }
            });

            return SignInteractionSystem;
        }
    ]);
