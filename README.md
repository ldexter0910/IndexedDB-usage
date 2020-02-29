# IndexedDB-usage
Implementation and usage of the concepts of IndexedDb,which is nothing but a database provided by the browser to store data , session independent.

As told at https://javascript.info/indexeddb

IndexedDB is a built-in database, much more powerful than localStorage.

Key/value storage: value can be (almost) anything, multiple key types.
Supports transactions for reliability.
Supports key range queries, indexes.
Can store much more data than localStorage.
That power is usually excessive for traditional client-server apps. IndexedDB is intended for offline apps, to be combined with ServiceWorkers and other technologies.

The native interface to IndexedDB, described in the specification https://www.w3.org/TR/IndexedDB, is event-based.

I created a dummy application in which the user has to provide the Employee details (Id {unique}, Name and Email).
This data gets stored within an objectStore in a database created and stored in the browser using the above mentioned resource.
