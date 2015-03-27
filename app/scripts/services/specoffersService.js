'use strict';

angular.module('admissionSystemApp')
  .factory('SpecoffersService', ['Restangular',
    function (Restangular) {

    var restAngular =
      Restangular.withConfig(function(Configurer) {
        Configurer.setBaseUrl('http://104.236.29.16:8080/is-lnu-rest-api/api/');
        Configurer.setDefaultHeaders({
            Authorization: 'Basic YWRtaW46bmltZGE='
        });
        Configurer.addResponseInterceptor(function(data, operation) {
            if (operation === 'getList') {
                return data.resources;
            } else {
                return data;
            }
        });
        Configurer.setRequestInterceptor(function(element, operation, route, url) {
            if (operation === 'put') {
                delete element.uri;
            }
            return element;
        });
    });

    function addEntireSpecoffer (obj) {
        restAngular.all('specoffers').post(obj.specoffer).then(function (response) {
            for (var i=0; i<obj.subjects.length; i+=1) {
                obj.subjects[i].specOfferId = response.id;
                restAngular.one('specoffers', response.id).one('subjects').customPOST(obj.subjects[i]);
            }
            for (var i=0; i<obj.benefites.length; i+=1) {
                obj.benefites[i].specOfferId = response.id;
                restAngular.one('specoffers', response.id).one('benefits').post('', obj.benefites[i]);
            }
        })
    }

    return {
        manageEntireSpecoffer: function (entireSpecoffer) {
            return addEntireSpecoffer(entireSpecoffer);
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
