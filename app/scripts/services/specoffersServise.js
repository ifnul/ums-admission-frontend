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
            if (operation === "getList") {
                return data.resources;
            } else {
                return data;
            }
        });
        Configurer.setRequestInterceptor(function(element, operation, route, url) {
            if (operation === "put") {
                delete element.uri;
            } 
            return element;
        });
    });

    // var _specoffersService = ;

    return { 
        manageSpecoffers: {
            getSpecoffersList: function() {
                return restAngular.all('specoffers').getList();
            },
            addSingleSpecoffer: function(params) {
                return _specoffersService.post(params);
            },
            getSingleSpecoffer: function (specOfferID) {
                // WHY SECOND OPTION DOESN'T WORK ?
                return restAngular.one('specoffers', specOfferID).get()
                // return _specoffersService.getList(specOfferID)
            },
            updateSingleSpecoffer: function(newOffer, specOfferID) {
                // var offer = restAngular.one("specoffers", id);
                // offer.get().then(function (oneOffer) {
                //     oneOffer.specialtyId = 001;
                //     oneOffer.put();
                //     // console.log('oneOffer', oneOffer);
                //     // return oneOffer.customPUT(newOffer,id)
                // })
                // IF YOU WANT TO CHANGE RECEIVED OBJECT AND THEN PUT IT BACK USE DRAFT ABOVE
                return restAngular.one("specoffers", specOfferID).customPUT(newOffer)
            },
            deleteSingleSpecoffer: function(specOfferID) {
                return restAngular.one("specoffers", specOfferID).remove()
            }
        },
        manageSubjects: {
            // getListOfSubjects DOESNT'T WORK - SERVER FAILS
            getListOfSubjects: function(specOfferID) {
                return restAngular.one('specoffers', specOfferID).one('subjects').getList();
            },
            getSingleSubject: function(specOfferID, subjectID) {
                return restAngular.one('specoffers', specOfferID).one('subjects', subjectID).get();
            },
            addSingleSubject: function(specOfferID, subject) {
                // NOTE THAT BOTH OPTIONS BELOW IS THE SAME. WHY ??
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
    }
  }]);
