export class Singleton<T> {
    private static m_instance:any = null;

    public static Instance<T>(tp :{new():T}):T{
        if(!this.m_instance){
            this.m_instance = new tp();
        }     
        return this.m_instance;  
    }

    public static GetInstance<T>():T{
        if(!this.m_instance){
            this.m_instance = new Singleton as T;
        }     
        return this.m_instance;   
    }

    // public static get instance<T>

    // public get Instance<T>(): T{
    //     if(this.m_instance == null){
    //         this.m_instance = new Singleton as T;
    //     }
    //     return this.m_instance as T;
    // }
}