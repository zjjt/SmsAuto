export const MAJDISPO='MAJDISPO';
export const MAJDISPOBANK='MAJDISPOBANK';
export const USERCONNECTED='USERCONNECTED';
export const SWITCHTAB1="SWITCHTAB1";
export const SWITCHTAB2="SWITCHTAB2";
export const SWITCHTABN="SWITCHTABN";
export const RESET="RESET";
export const RESETTABS="RESETTABS";

export function userconnected(userobj){
	return{
		type:USERCONNECTED,
		//user:userobj
	}
}
export function switchtab1(who){
	//alert(who);
	return{
		type:SWITCHTAB1,
		who:who
	}
}
export function switchtab2(who){
	//alert(who);
	return{
		type:SWITCHTAB2,
		who:who
	}
}
export function resetTabs(){
	//alert(who);
	return{
		type:RESETTABS,
	}
}
export function switchtabN(who,index){
	return{
		type:SWITCHTABN,
		who:who,
		index

	}
}

export function resetState(){
	return{
		type:RESET
	}
}