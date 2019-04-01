import { eventChannel } from "redux-saga";
import { Socket } from 'phoenix';

export function* connectToSocket() {
    const socket = yield new Socket('ws://machinestream.herokuapp.com/api/v1/events');
    socket.connect();
    return socket;
}

export function* joinChannel(socket, channelName) {
    const channel = yield socket.channel(channelName, {});
    channel.join()
        .receive('ok', (resp) => {
            console.log('Joined successfully', resp);
        })
        .receive('error', (resp) => {
            console.log('Unable to join', resp);
        });

    return channel;
}

export const createSocketChannel = (channel, constant) =>
    // `eventChannel` takes a subscriber function
    // the subscriber function takes an `emit` argument to put messages onto the channel
    eventChannel((emit) => {
        const newDataHandler = (event) => {
            console.log(event);
            emit(event);
        };

        channel.on(constant, newDataHandler);

        const unsubscribe = () => {
            channel.off(constant, newDataHandler);
        };

        return unsubscribe;
    });