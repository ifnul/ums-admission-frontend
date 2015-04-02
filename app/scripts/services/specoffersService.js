'use strict';


angular.module('admissionSystemApp')
.constant('_', window._);

angular.module('admissionSystemApp')
.factory('SpecoffersService', ['Restangular', '$q', '$filter',
    function (Restangular, $q, $filter) {

        var restAngular =
        Restangular.withConfig(function(Configurer) {
            Configurer.setBaseUrl('http://104.236.29.16:8080/is-lnu-rest-api/api/');
            Configurer.setDefaultHeaders({
                Authorization: 'Basic YWRtaW46bmltZGE='
            });
            Configurer.addResponseInterceptor(function(data, operation) {
                if (operation === 'get') {
                    delete data.uri;
                }
                if (operation === 'getList' ) {
                    return data.resources;
                } else {
                    return data;
                }
            });
            Configurer.setRequestInterceptor(function(element, operation) {
                if (operation === 'post' || operation === 'put') {
                    element.begDate = $filter('date')(element.begDate, 'yyyy-MM-dd');
                    element.endDate = $filter('date')(element.endDate, 'yyyy-MM-dd');
                    delete element.uri;
                }
                return element;
            });
        });

var objCopy = {};
function getEntireSpecoffer (id) {
    var entireSpecoffer = {};
    entireSpecoffer.specoffer = restAngular.one('specoffers', id).get();
    entireSpecoffer.subjects = restAngular.one('specoffers', id).one('subjects').getList();
    entireSpecoffer.benefits = restAngular.one('specoffers', id).one('benefits').getList();

    $q.all(entireSpecoffer).then(function (res) {
        _.merge(objCopy, res);
        console.log('obj COPY (inside getEntireSpecoffer)  ',objCopy);
    })
    return $q.all(entireSpecoffer);
        // return $q.all(entireSpecoffer).then(function (res) {
        //     // objCopy = angular.copy(entireSpecoffer);
        //     _.merge(objCopy, res);
        //     console.log('obj COPY (inside getEntireSpecoffer)  ',objCopy);
        // })
}


function addBenefitsAndSubjects (subjects, benefits, specOfferId) {
    var promises = [];
    for (var i=0; i<subjects.length; i+=1) {
        subjects[i].specOfferId = specOfferId;
        var subjectPromise = restAngular.one('specoffers', specOfferId).one('subjects').customPOST(subjects[i]);
        promises.push(subjectPromise);
    }
    for (var i=0; i<benefits.length; i+=1) {
        benefits[i].specOfferId = specOfferId;
        var benefitPromise = restAngular.one('specoffers', specOfferId).one('benefits').post('', benefits[i]);
        promises.push(benefitPromise);
    }
    return $q.all(promises);
}

function addEntireSpecoffer (obj) {
    var id = $q.defer();
    restAngular.all('specoffers').post(obj.specoffer).then(function (response) {
        id.resolve(response.id);
            // obj.specoffer.id = response.id;
        });
    return id.promise;
}

function addOrEditSpecoffer (obj) {
    console.log('we are indise addOrEditSpecoffer');
    // console.log('obj#1',obj);
    if (!objCopy.specoffer) {
            // console.log('add specoffer objCopy',objCopy)
            console.log(!!objCopy)

            addEntireSpecoffer(obj).then(function (id) {
                console.log('addind entire specoffer done! response id',id);
                obj.specoffer.id = id; // delete
                console.log('obj#2 +id',obj);
                console.log('obj.subjects',obj.subjects);
                console.log('obj.benefits',obj.benefits);

                addBenefitsAndSubjects(obj.subjects, obj.benefits, id).then(function () {
                    console.log('we send reques for the new entire object!');

                    getEntireSpecoffer(id).then(function (res) {
                        console.log('updatinh obj (entireSpecoffer)');
                        console.log('obj old',obj);
                        console.log('getEntireSpecoffer(id) )new obj)',res);

                        _.merge(obj, res);
                    });
                })
                //
            })
            //
        } else {
            // console.log('EDIT specoffer - objCopy', objCopy)
            // console.log(!!objCopy)
            editEntireSpecoffer(obj);
        }
    }

    function editEntireSpecoffer (newOnj) {
        // console.log('newOnj',newOnj.specoffer);
        // console.log('objCopy',objCopy.specoffer);

        // var largePromisesArray = [];
        var specOfferID = objCopy.specoffer.id;
        if (!angular.equals(newOnj.specoffer, objCopy.specoffer)) {
            // console.log(!!!angular.equals(newOnj.specoffer, objCopy.specoffer)); // delete this
            console.log('specoffer obj are not equals'); // delete this
            var promiseSpecoffer = restAngular.one('specoffers', specOfferID).customPUT(newOnj.specoffer).then(function () {
                _.merge(objCopy.specoffer, newOnj.specoffer)
            });
            // largePromisesArray.push(promiseSpecoffer);
        }
        console.log('specoffer obj they are equals!!');



        // var itemsPromisesArray = compareArrays(newOnj.subjects, objCopy.subjects, specOfferID);
        $q.all([
            compareArrays(newOnj.subjects, objCopy.subjects, specOfferID, 'subjects'),
            compareArrays(newOnj.benefits, objCopy.benefits, specOfferID, 'benefits'),
            promiseSpecoffer
        ])
            .then(function () {
                console.log('we send request for the new entire object!');
                getEntireSpecoffer(specOfferID).then(function (res) {
                    _.merge(newOnj, res);
                    console.log('merge them', newOnj);
                })
            });

        // compareArrays(newOnj.subjects, objCopy.subjects, specOfferID, 'subjects').then(function () {
        //     $q.all(promiseSpecoffer).then(function () {
        //         console.log('we send request for the new entire object!');
        //         getEntireSpecoffer(specOfferID).then(function (res) {
        //             _.merge(newOnj, res);
        //             console.log('merge them', newOnj);
        //         })
        //     })
        // });

    }

    function compareArrays (newArr, oldArr, specOfferID, route) {
        console.log('inside compareArrays');
        var promises = [];
        var x = angular.copy(newArr);
        var y = angular.copy(oldArr);
        console.log('newArr',x);
        console.log('oldArr',y);
        _.forEach(newArr, function(item, i) {
            // var itemCopy = angular.copy(item); // delete this later
            if (item.addName) {delete item.addName}; // delete this later
            if (item.subject) {delete item.subject}; // delete this later
            if (!item.specOfferId) { // if item obj. doesn't have specOfferId property - POST NEW item
                console.log('we have new item. Here it is', item);
                item.specOfferId = specOfferID;
                var promise = restAngular.one('specoffers', specOfferID).one(route).customPOST(item).then(function (res) {
                    item.id = res.id;
                });
                promises.push(promise);
            } else {
                var oldItem = _.find(oldArr, { 'id': item.id});
                console.log('oldItem', oldItem);
                if (!angular.equals(oldItem, item)) {
                    console.log('we have changed item. Here it is', oldItem);
                    var promise = restAngular.one('specoffers', specOfferID).one(route, oldItem.id).customPUT(item).then(function () {});
                    promises.push(promise);
                }
            }
        });

        _.forEach(oldArr, function(item, i) {
            // console.log('_.some(newArr, { id: item.id})', _.some(newArr, { 'id': item.id}));
            if (!_.some(newArr, { 'id': item.id})) {
                console.log('we have item to delete. Here it is', item);
                var promise = restAngular.one('specoffers', specOfferID).one(route, item.id).remove().then(function () {});
                promises.push(promise);
            }
        });

        console.log('promises',promises);
        return $q.all(promises);
        // return promises;
    }

  return {
    addEntireSpecoffer: function (entireSpecoffer) {
        return addEntireSpecoffer(entireSpecoffer);
    },
    getEntireSpecoffer: function (id) {
        return getEntireSpecoffer(id);
    },
    editEntireSpecoffer: function (newOnj, oldObj) {
        return editEntireSpecoffer(newOnj, oldObj);
    },
    addOrEditSpecoffer: function (obj) {
        return addOrEditSpecoffer (obj);
    },
    manageSpecoffers: {
        getSpecoffersList: function() {
            return restAngular.all('specoffers').getList();
        },
        addSingleSpecoffer: function(params) {
            return restAngular.all('specoffers').post(params);
        },
        getSingleSpecoffer: function (specOfferID) {
            return restAngular.one('specoffers', specOfferID).get();
        },
        updateSingleSpecoffer: function(newOffer, specOfferID) {
            return restAngular.one('specoffers', specOfferID).customPUT(newOffer);
        },
        deleteSingleSpecoffer: function(specOfferID) {
            return restAngular.one('specoffers', specOfferID).remove();
        }
    },
    manageSubjects: {
        getListOfSubjects: function(specOfferID) {
            return restAngular.one('specoffers', specOfferID).one('subjects').getList();
        },
        getSingleSubject: function(specOfferID, subjectID) {
            return restAngular.one('specoffers', specOfferID).one('subjects', subjectID).get();
        },
        addSingleSubject: function(specOfferID, subject) {
            return restAngular.one('specoffers', specOfferID).one('subjects').customPOST(subject);
                // return restAngular.one('specoffers', specOfferID).one('subjects').post('', subject);
            },
            removeSingleSubject: function(specOfferID, subjectID) {
                return restAngular.one('specoffers', specOfferID).one('subjects', subjectID).remove();
            },
            updateSingleSubject: function(specOfferID, subjectID, newSubject) {
                return restAngular.one('specoffers', specOfferID).one('subjects', subjectID).customPUT(newSubject);
            }
        },
        manageBenefits: {
            getListOfBenefits: function(specOfferID) {
                return restAngular.one('specoffers', specOfferID).one('benefits').getList();
            },
            getSingleBenefit: function(specOfferID, benefitID) {
                return restAngular.one('specoffers', specOfferID).one('benefits', benefitID).get();
            },
            addSingleBenefit: function(specOfferID, benefit) {
                return restAngular.one('specoffers', specOfferID).one('benefits').post('', benefit);
            },
            removeSingleBenefit: function(specOfferID, benefitID) {
                return restAngular.one('specoffers', specOfferID).one('benefits', benefitID).remove();
            },
            updateSingleBenefit: function(specOfferID, benefitID, newBenefit) {
                return restAngular.one('specoffers', specOfferID).one('benefits', benefitID).customPUT(newBenefit);
            }
        }
    };
  }]);
