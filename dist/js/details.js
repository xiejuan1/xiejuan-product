"use strict";require(["config"],function(){require(["jquery","template","load"],function(i,s){i(".small").on("click","li",function(){i(".top1").css("display","none"),i(i(this)[0].children[1]).css("display","block"),i(".small li").css({border:"1px solid #dfdfdf"}),i(this).css({border:"3px solid #dfdfdf"})}),i(".amount").on("click",function(){})})});