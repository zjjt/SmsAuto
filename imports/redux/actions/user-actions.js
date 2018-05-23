export const MAJDISPO='MAJDISPO';
export const MAJDISPOBANK='MAJDISPOBANK';
export const USERCONNECTED='USERCONNECTED';
export const SWITCHTAB1="SWITCHTAB1";
export const SWITCHTAB2="SWITCHTAB2";
export const RESET="RESET"

export function userconnected(userobj){
	return{
		type:USERCONNECTED,
		//user:userobj
	}
}
export function switchtab1(userobj){
	return{
		type:SWITCHTAB1,
		//user:userobj
	}
}
export function switchtab2(userobj){
	return{
		type:SWITCHTAB2,
		//user:userobj
	}
}

export function resetState(){
	return{
		type:RESET
	}
}