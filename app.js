var MyApp=angular.module('ShoppingListCheckOff',[]);
MyApp.controller('ToBuyController',ToBuyController )
.controller('AlreadyBoughtController',AlreadyBoughtController )
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);


function ToBuyController($scope,ShoppingListCheckOffService, $rootScope){
  $scope.ToBuyMessage="Everything is bought!";
  $scope.ToBuyList=ShoppingListCheckOffService.ToBuyList();
  $scope.BoughtItem=function(index){
    ShoppingListCheckOffService.BoughtItem(index);
   $scope.isBuyMessageDisplay=ShoppingListCheckOffService.ToBuyListItemCount()>0 ? false : true;
     $scope.isBoughtMessageDisplay=  ShoppingListCheckOffService.BoughtListItemCount()>0 ? false : true;
    $rootScope.$broadcast('ctr1Data', $scope.isBoughtMessageDisplay);
  }



}

function AlreadyBoughtController($scope,ShoppingListCheckOffService){
  $scope.BoughtMessage="Nothing bought yet";
    $scope.isBoughtMessageDisplay=true;
  $scope.BoughtList=ShoppingListCheckOffService.BoughtList();
  $scope.$on('ctr1Data', function (event, args) {
              $scope.isBoughtMessageDisplay=  args;
          });
}


function ShoppingListCheckOffService(){
  var service=this;
  var  itemsBought= [];
  var  itemToBuy= [
    {name:'Cookies',quantity:'10'},
    {name:'Biskits',quantity:'5'},
    {name:'Bread',quantity:'20'},
    {name:'Tea',quantity:'50'},
    {name:'Cofee',quantity:'60'}
  ];

  service.ToBuyList =function(){
    return itemToBuy;
  }


  service.BoughtList =function(){
    return itemsBought;
  }

  service.BoughtItem=function(index){

    var item=  itemToBuy[index];
    itemsBought.push(item)
    itemToBuy.splice(index,1);

  }

  service.ToBuyListItemCount=function(){
    return itemToBuy.length;
  }
  service.BoughtListItemCount=function(){
    return itemsBought.length;
  }


}
