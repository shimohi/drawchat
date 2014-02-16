package allnight.creathon.drawchat;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * Created by saito on 2014/02/16.
 */
public class DrawChatSession extends MessageInbound {

//	/**
//	 * セッション
//	 */
//	private HttpSession session;

	/**
	 *
	 */
	private List<DrawMessage> reserveList = Collections.synchronizedList(new ArrayList<DrawMessage>());

	private WsOutbound drawOutbound;

	/**
	 * スレッド
	 */
	private DrawChatThread thread;

	/**
	 * 閉じられたかどうか
	 */
	private boolean close = false;

	/**
	 * seq番号現在値
	 */
	private long seqNow = -1L;

	public DrawChatSession(DrawChatThread thread){
		this.thread = thread;
	}

	public long getSeqNow(){
		return this.seqNow;
	}

	public void pushMessage(DrawMessage[] messages){
	    for(DrawMessage message:messages){
			this.reserveList.add(message);
			this.seqNow = message.getSeqNumber();
		}
		try {
			this.write();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * @return 有効期限切れかどうか。
	 */
	public boolean isTimeOver(){
		return this.close;
	}


	private synchronized void write() throws IOException {
		if(this.drawOutbound == null){
			return;
		}
		List<DrawMessage> messages = this.reserveList;
		this.reserveList.clear();

		if(messages.size() == 0){
			return;
		}

		StringWriter writer = new StringWriter();
		JsonFactory jsonFactory = new JsonFactory();
		JsonGenerator generator = jsonFactory.createGenerator(writer);

		generator.writeStartArray();
		for(DrawMessage message:messages){
			message.writeJSON(generator);
		}
		generator.writeEndArray();
		writer.close();

		String result = writer.toString();
		if(result.length() == 0){
			return;
		}

		CharBuffer buffer = CharBuffer.wrap(result);
		this.drawOutbound.writeTextMessage(buffer);
	}


	// 接続時の処理
	@Override
	public void onOpen(WsOutbound outbound){
		this.drawOutbound = outbound;
		this.thread.checkAndPushMessage();
	}

	// 接続解除時の処理
	@Override
	public void onClose(int status){
		this.close = true;
//		messageList.remove(this);
	}

	// メッセージ受信時の処理
	@Override
	public void onTextMessage(CharBuffer message) throws IOException {
		System.out.println("message"+ message);
		this.thread.addDrawMessage(message.toString());
	}

	// メッセージ受信時の処理
	@Override
	public void onBinaryMessage(ByteBuffer bb) throws IOException{
	}
}
