app.controller('gridController', ["$scope","$route","$log", "$rootScope", "$window", "$location", "$timeout", "$http", "$filter", "$controller",
    "mainService",function ($scope,$route,$log, $rootScope, $window, $location, $timeout, $http, $filter, $controller, mainService){
	console.log('gridController');
    $scope.headingTitle = "PCBA DATA List";
    $scope.loadingIcon = false;
    $scope.rawGridResponseObj = [];
    $scope.init = function(){
    	$scope.loadingIcon = true;
    	$scope.headingTitle = "PCBA Data List";
    	$scope.getPCBAGridData();
    	console.log("$scope.loadingIcon -->",$scope.loadingIcon);
    }
    
    /**getPCBAGridData function Start*/
	$scope.getPCBAGridData = function(){
		//$scope.gridOptions.data = [];
		$scope.getProcessedResponseObj = [];
		console.log("$scope.loadingIcon -->",$scope.loadingIcon);
		   mainService.getPCBADataDtls()
			    .then(function (result){
		        //if (result && result.data && result.data.data) {
		        	console.log("Result -->",result);
		        	
		        $scope.processGridResponse(result);
	            $scope.loadingIcon = false;
		        //}
			},function (error) {
               // $scope.gridOptions.data = [];
                $log.log("Error: API Failed" + " " + error.status + " " + error.statusText);
            }, $scope.searchRequest);
			
		   
	   }
	/**getPCBAGridData function End*/
	
	
	/**processGridResponse function Start*/
	$scope.processGridResponse = function (result) {
	     // console.log("Inside processGridResponse method result is ",result);
	      if (result){
	    	       //console.log("Inside processGridResponse method result data length is ",result.length);
                   angular.forEach(result, function (values) { 
                	   var row = {  
                			"item_number": values.item_number,
                			"project": values.project,
                			"layer_count": values.layer_count,
                			"board_thickness": values.board_thickness,
                			"board_finish": values.board_finish,
                			"material_requirement": values.material_requirement,
                			"number_of_channels": values.number_of_channels,
                			"rf_frequency_min": values.rf_frequency_min,
                			"rf_frequency_max": values.rf_frequency_max,
                			"pin_count": values.pin_count,
                			"burst_length": values.burst_length,
                			"biascurrentma": values.biascurrentma,
                			"secondary_voltagev": values.secondary_voltagev,
                			"secondary_currenta": values.secondary_currenta,
                			"operating_frequency": values.operating_frequency,
                			"impedenceohms": values.impedenceohms,
                			"numberofgroundpins": values.numberofgroundpins,
                			"package_length": values.package_length,
                			"package_width": values.package_width,
                			"package_height": values.package_height,
                			"pin_length": values.pin_length,
                			"item_cost": values.item_cost
                		}
                   
                   
                   });
                   //console.log("Total Count of grid row is", $scope.getProcessedResponseObj.length);
                   $scope.gridOptions.data = $scope.getProcessedResponseObj;
	       }
	      
	}
	/**processGridResponse function End*/
	
	/**paginationOptions function Start*/
	   var paginationOptions = {
	                pageNumber: 1,
	                pageSize: 10
	            };	
  /**paginationOptions function End*/
	
	/**Grid Definition Start*/
	 var hdrCls = "";
    $scope.gridOptions = {             
            enableColumnResizing: true,
            paginationPageSizes: [10, 25, 50],
            paginationPageSize: paginationOptions.pageSize,
            useExternalPagination: false,
            useExternalSorting: false,
            enableColumnMenus: false,
            enableFiltering: $scope.userRoleFlag,
            useExternalFiltering: false,
            enableRowSelection: true,
            enableSelectAll: true,
            enableCellEditOnFocus: false,
            enableCellEdit: false, 
            enableSorting: true,
           /* onRegisterApi: function(gridApi){
                $scope.gridApi = gridApi; 
                $scope.gridApi.core.handleWindowResize();
        
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                   paginationOptions.pageNumber = newPage;
                   paginationOptions.pageSize = pageSize;
                   $scope.init();
               });     
             },*/
             onRegisterApi: function (gridApi) {
				 $scope.gridApi = gridApi;
				 $scope.gridApi.core.handleWindowResize();
        
                gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                   paginationOptions.pageNumber = newPage;
                   paginationOptions.pageSize = pageSize;
                   //$scope.init(); making issue of of duubling data
               }); 
                /*gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                    $scope.selectedRows = gridApi.selection.getSelectedRows();
                    if (row.isExpanded) {
                       row.isCurrentRowSelected = false;
                       angular.forEach($scope.selectedRows, function (rowDtls) {
                          if (rowDtls.item_number == row.entity.item_number) {
                             row.isCurrentRowSelected = true;
                             return;
                          }
                       });
                    }else {
                       row.isExpanded = false;
                    }
                 });*/
                gridApi.selection.on.rowSelectionChanged($scope, function (row) {       
                   if (row.isSelected) {
                       row.isRowSelected = true;
                       $scope.selectedSupplierRowArray.push(row.entity);
                   } else {
                       row.isRowSelected = false;
                       $scope.selectedSupplierRowArray = [];
           
                   }
                   $scope.submitSaveRequest = gridApi.selection.getSelectedRows();
                });
                gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
                   $scope.submitSaveRequest = [];
                   angular.forEach(rows, function (items) {
                      if (items.isSelected) {
                         items.isRowSelected = true;
                         items.isCurrentRowSelected = false;
                         if (items.isExpanded && items.isSelected) {
                            items.isCurrentRowSelected = true;
                         }
                         $scope.selectedRows = [];
                         $scope.submitSaveRequest.push(items.entity);
                         $scope.selectedRows.push(items);
                         if (items.isExpanded) {
                               $scope.loadSubGridDetails(items);
                         }
                         $scope.selectedSupplierRowArray.push(items.entity);//selected multiple row  pushed  into array                        
                      }else {
                         items.isRowSelected = false;
                         items.isCurrentRowSelected = false;
                         if (items.isExpanded && items.isSelected) {
                               items.isCurrentRowSelected = true;
                         }
                         $scope.selectedRows = [];
                         $scope.submitSaveRequest.push(items.entity);
                         $scope.selectedRows.push(items);
                         if (items.isExpanded) {
                               $scope.loadSubGridDetails(items);
                         }
                         $scope.selectedSupplierRowArray = [];
                   }
                });
             });
          },
    
          columnDefs: [
                {
                    field: 'item_number',
                    cellClass: 'grid-align-left',
                    displayName: 'Item No.',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    cellTooltip: function (row, col) { return row.entity.item_number; }, 
                    enableHiding: false,       
                    pinnedLeft:false,
                    enableFiltering:true,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    //filterHeaderTemplate:getFilterTemplate("supplier"),
                    cellTemplate:"<div style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' class=\"grid-cell-cus\" title='{{row.entity.item_number}}'>{{ row.entity.item_number }}</div>",
                },{
                    field: 'project',
                    cellClass: "",
                    displayName: 'Project',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    // headerCellClass: $scope.highlightFilteredHeader,
                    headerTooltip: function (col) { return col.displayName; },
                    cellTooltip: function (row, col) { return row.entity.project; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap;' class=\"grid-cell-cus\" title='{{row.entity.project}}'>{{ row.entity.project }}</div>",
                },{
			        field: 'item_cost',
			        cellClass: "",
			        displayName: 'Item Cost',
			        enableSorting: true,
			        cellTooltip: true,
			        headerCellClass: hdrCls,
			        headerTooltip: function (col) { return col.displayName; },
			        enableHiding: false,
			        enableFiltering: false,
			        pinnedLeft:false,
			        enableCellEdit: false,
			        enableCellEditOnDblClick: false,
			        cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.item_cost }}</div>",
                },{
                    field: 'layer_count',
                    cellClass: "",
                    displayName: 'Layer Count',
                    enableSorting: true,
                    type:'number',
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.layer_count }}</div>",
                },{
                    field: 'board_thickness',
                    cellClass: "",
                    displayName: 'Board Thickness',
                    enableSorting: true,
                    type:'number',
                    cellTooltip: true,
                    headerCellClass: $scope.highlightFilteredHeader,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    pinnedLeft:false,
                    enableFiltering: false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    //filterHeaderTemplate: getFilterTemplate("totMpns"),
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.board_thickness }}</div>",
                },{
                    field: 'board_finish',
                    cellClass: "",
                    displayName: 'Board Finish',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.board_finish }}</div>",            
                },{
                    field: 'material_requirement',
                    cellClass: "",
                    displayName: 'Material Requirement',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.material_requirement }}</div>",
                },{
                    field: 'number_of_channels',
                    cellClass: "",
                    displayName: 'No.of Channels',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: $scope.highlightFilteredHeader,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.number_of_channels }}</div>",
                },{
                    field: 'rf_frequency_min',
                    cellClass: "",
                    displayName: 'RF Min. Frequency',
                    enableSorting: true,
                    cellTooltip: true,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.rf_frequency_min }}</div>",
                },{
                    field: 'rf_frequency_max',
                    cellClass: "",
                    displayName: 'RF Max. Frequency',
                    enableSorting: true,
                    cellTooltip: true,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.rf_frequency_max }}</div>",
                },{
                    field: 'pin_count',
                    cellClass: "",
                    displayName: 'Pin Count',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.pin_count }}</div>",
                },{
                    field: 'burst_length',
                    cellClass: "",
                    displayName: 'Burst Length',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.burst_length }}</div>",
                },{
			        field: 'biascurrentma',
			        cellClass: "",
			        displayName: 'Biascurrentma',
			        enableSorting: true,
			        cellTooltip: true,
			        headerCellClass: hdrCls,
			        headerTooltip: function (col) { return col.displayName; },
			        enableHiding: false,
			        enableFiltering: false,
			        pinnedLeft:false,
			        enableCellEdit: false,
			        enableCellEditOnDblClick: false,
			        cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.biascurrentma }}</div>",
                },{
                    field: 'secondary_voltagevt',
                    cellClass: "",
                    displayName: 'Secondary Voltagev',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.secondary_voltagevt }}</div>",
                },{
                    field: 'secondary_currenta',
                    cellClass: "",
                    displayName: 'Secondary Currenta',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.secondary_currenta }}</div>",
                },{
			        field: 'operating_frequency',
			        cellClass: "",
			        displayName: 'Operating Frequency',
			        enableSorting: true,
			        cellTooltip: true,
			        headerCellClass: hdrCls,
			        headerTooltip: function (col) { return col.displayName; },
			        enableHiding: false,
			        enableFiltering: false,
			        pinnedLeft:false,
			        enableCellEdit: false,
			        enableCellEditOnDblClick: false,
			        cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.operating_frequency }}</div>",
                },{
                    field: 'impedenceohms',
                    cellClass: "",
                    displayName: 'Impedenceohms',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.impedenceohms }}</div>",
                },{
                    field: 'secondary_currenta',
                    cellClass: "",
                    displayName: 'Secondary Currenta',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.secondary_currenta }}</div>",
                },{
			        field: 'numberofgroundpins',
			        cellClass: "",
			        displayName: 'No. of ground Pins',
			        enableSorting: true,
			        cellTooltip: true,
			        headerCellClass: hdrCls,
			        headerTooltip: function (col) { return col.displayName; },
			        enableHiding: false,
			        enableFiltering: false,
			        pinnedLeft:false,
			        enableCellEdit: false,
			        enableCellEditOnDblClick: false,
			        cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.numberofgroundpins }}</div>",
                },{
                    field: 'package_length',
                    cellClass: "",
                    displayName: 'Package Length',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.package_length }}</div>",
                },{
                    field: 'package_width',
                    cellClass: "",
                    displayName: 'Package Width',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.package_width }}</div>",
                },{
			        field: 'package_height',
			        cellClass: "",
			        displayName: 'Package Height',
			        enableSorting: true,
			        cellTooltip: true,
			        headerCellClass: hdrCls,
			        headerTooltip: function (col) { return col.displayName; },
			        enableHiding: false,
			        enableFiltering: false,
			        pinnedLeft:false,
			        enableCellEdit: false,
			        enableCellEditOnDblClick: false,
			        cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.package_height }}</div>",
                },{
                    field: 'pin_length',
                    cellClass: "",
                    displayName: 'Pin Length',
                    enableSorting: true,
                    cellTooltip: true,
                    headerCellClass: hdrCls,
                    headerTooltip: function (col) { return col.displayName; },
                    enableHiding: false,
                    enableFiltering: false,
                    pinnedLeft:false,
                    enableCellEdit: false,
                    enableCellEditOnDblClick: false,
                    cellTemplate:"<div class=\"grid-cell-cus\">{{ row.entity.pin_length }}</div>",
                }
                ],
        };
}]);