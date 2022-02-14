// @flow
import SocketIOClient from 'socket.io-client';
import {TRACKING_BASE_URL} from '../config/WebService';
import _ from 'lodash';

let isConnectedWithSocket = false;
// const LOG = process.env.REACT_APP_ENV === DEV_ENV;
const LOG = true;

class SocketIO {
  _appToken = '';

  /**ya
   *
   *
   * @param {function} connectCallBack
   * @param {function} disconnectCallBack
   * @param {function} connectionErrorCallBack
   * @memberof SocketIO
   */
  connect(connectCallBack, connectionErrorCallBack = undefined): void {
    this.socket = SocketIOClient(TRACKING_BASE_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });

    if (!isConnectedWithSocket) {
      // Global events are bound against socket

      this.socket.on('connect_error', (err) => {
        if (LOG) {
          console.log({err});
          console.log('Connect error');
        }

        if (connectionErrorCallBack) {
          connectionErrorCallBack();
        }
      });

      this.socket.on('connect', () => {
        isConnectedWithSocket = true;

        /* this.socket.off('ping');
        this.socket.on('ping', () => {
          console.log('Socket PING');
        });
        this.socket.off('pong');
        this.socket.on('pong', () => {
          console.log('Socket PONG');
        }); */

        if (LOG) {
          console.log('Connect to the socket.io');
        }

        if (connectCallBack) {
          connectCallBack();
          /*
          setTimeout(() => {
            connectCallBack();
          }, 500);
          */
        }
      });
    } else if (connectCallBack) {
      connectCallBack();
      /*
        setTimeout(() => {
          connectCallBack();
        }, 500);
        */
    }

    this.socket.on('errormessage', (data) => {
      // alert("Disconnect");
      isConnectedWithSocket = false;

      if (LOG) {
        console.log('errormessage socket.io', data);
      }
      if (connectionErrorCallBack) {
        connectionErrorCallBack();
      }
    });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }

  // ------------------ EMITS ------------------

  /**
   *
   *
   * @param {string} roomId
   * @param {string} userId
   
   * @memberof SocketIO
   */
  emit(...args): void {
    this.socket.emit(...args);
  }

  /**
   *
   *
   * @param {string} roomId
   * @param {string} userId
   
   * @memberof SocketIO
   */
  joinRoom(
    roomId: string,
    callback: string = this._appToken,
    roomOptions = {},
  ): void {
    // console.log("joinRoom");
    // console.log("roomId", roomId);
    // console.log("users", users);
    // console.log("appToken", appToken);
    // console.log("roomOptions", roomOptions);
    // console.log("callback joinRoom", callback);
    this.socket.emit('join', roomId, roomOptions, (joinError, joinSuccess) => {
      if (callback) callback(joinError, joinSuccess);
    });
  }

  // ------------------ LISTENERS ------------------

  onTrackingInfo(callback): void {
    this.socket.off('trackingInfo');
    this.socket.on('trackingInfo', (data) => {
      console.log('trackingInfo', data);

      if (LOG) {
        console.log('trackingInfo', data);
      }

      if (callback) {
        callback({
          longitude: data.location.coords.longitude,
          latitude: data.location.coords.latitude,
        });
      }
    });
  }

  getAllDrivers(payload, callback): void {
    this.socket.emit('getAllDrivers', payload, (data) => {
      if (LOG) {
        console.log('getAllDrivers', data);
      }
      if (callback) {
        callback(data);
      }

      // console.log({ aya: data });
    });
  }

  driverIsInactive(payload, callback): void {
    this.socket.emit('driverIsInactive', payload, (data) => {
      if (LOG) {
        console.log('driverIsInactive', data);
      }
      if (callback) {
        callback(data);
      }

      // console.log({ aya: data });
    });
  }

  onTaskCreated(callback): void {
    this.socket.off('taskCreated');
    this.socket.on('taskCreated', (data) => {
      if (LOG) {
        console.log('taskCreated', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onAllTaskRequest(callback): void {
    this.socket.off('taskAllRequest');
    this.socket.on('taskAllRequest', (data) => {
      if (LOG) {
        console.log('taskAllRequest', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onTaskRequest(callback): void {
    this.socket.off('taskRequest');
    this.socket.on('taskRequest', (data) => {
      if (LOG) {
        console.log('taskRequest', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onTaskDelay(callback): void {
    this.socket.off('taskDelay');
    this.socket.on('taskDelay', (data) => {
      if (LOG) {
        console.log('taskDelay', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onDriverDeleted(callback): void {
    this.socket.off('driverDeleted');
    this.socket.on('driverDeleted', (data) => {
      if (LOG) {
        console.log('driverDeleted', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onOrderUpdated(callback): void {
    this.socket.off('orderUpdated');
    this.socket.on('orderUpdated', (data) => {
      if (LOG) {
        console.log('orderUpdated', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onTaskDeleted(callback): void {
    this.socket.off('taskDeleted');
    this.socket.on('taskDeleted', (data) => {
      if (LOG) {
        console.log('taskDeleted', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onTaskUpdated(callback): void {
    this.socket.off('taskUpdated');
    this.socket.on('taskUpdated', (data) => {
      if (LOG) {
        console.log('taskUpdated', data);
      }
      if (callback) {
        callback(data);
      }
    });
  }

  onDriverCreated(callback): void {
    this.socket.off('driverCreated');
    this.socket.on('driverCreated', (data) => {
      if (LOG) {
        console.log('driverCreated', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onDriverUpdated(callback): void {
    this.socket.off('driverUpdated');
    this.socket.on('driverUpdated', (data) => {
      if (LOG) {
        console.log('driverUpdated', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onTaskSequenceChanged(callback): void {
    this.socket.off('taskSequenceChanged');
    this.socket.on('taskSequenceChanged', (data) => {
      if (LOG) {
        console.log('taskSequenceChanged', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onDriverInactiveAutomatically(callback): void {
    this.socket.off('driverInactive');
    this.socket.on('driverInactive', (data) => {
      if (LOG) {
        console.log('driverInactive', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onTaskEtaUpdate(callback): void {
    this.socket.off('taskEta');
    this.socket.on('taskEta', (data) => {
      if (LOG) {
        console.log('taskEta', data);
      }

      if (callback) {
        if (_.isNil(data.data)) {
          callback(data.vendorEta);
        } else {
          callback(data.data.vendorEta);
        }
      }
    });
  }

  onMigrationEnded(callback) {
    this.socket.off('migrationEnded');
    this.socket.on('migrationEnded', (data) => {
      if (LOG) {
        console.log('migrationEnded', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  onPreviousTaskEtaUpdate(callback): void {
    this.socket.off('previousTaskEta');
    this.socket.on('previousTaskEta', (data) => {
      if (LOG) {
        console.log('previousTaskEta', data);
      }

      if (callback) {
        callback(data);
      }
    });
  }

  stillConnected(callback): void {
    this.socket.off('stillConnected');
    this.socket.on('stillConnected', (data) => {
      if (LOG) {
        console.log('======= stillConnected =========');
      }

      if (callback) {
        callback(data);
      }
    });
  }

  /**
   *
   *
 
   * @memberof SocketIO
   */
  onDisconnect(callback): void {
    this.socket.on('disconnect', () => {
      isConnectedWithSocket = false;

      if (LOG) {
        console.log('Disconnect from socket.io');
      }

      if (callback) {
        callback();
      }
    });
  }

  onConnect(callback): void {
    this.socket.on('connect', () => {
      isConnectedWithSocket = true;
      if (LOG) {
        console.log('Connect from socket.io');
      }

      if (callback) {
        callback();
      }
    });
  }
}

export default new SocketIO();
