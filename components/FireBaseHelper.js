
import firebase from 'react-native-firebase';

let fireBase = null;

export function getInstance()
{
    if (fireBase == null )
        {
            fireBase = firebase;
        }
        return fireBase;
}