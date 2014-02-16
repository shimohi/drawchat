package allnight.creathon.drawchat;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * Created by saito on 2014/02/16.
 */
public class DrawChatThread {

	/**
	 * 書き込みメッセージ
	 */
	private DrawMessages messages;

	private List<DrawChatSession> sessions = Collections.synchronizedList(new LinkedList<DrawChatSession>());

	public synchronized void addSession(DrawChatSession session){
		this.sessions.add(session);
	}

	/**
	 * 更新メッセージを追加します。
	 * @param jsonData
	 * @throws IOException
	 */
	public void addDrawMessage(String jsonData) throws IOException {
//		try(BufferedInputStream stream = new BufferedInputStream(jsonData)){
			JsonFactory factory = new JsonFactory();
			JsonParser parser = factory.createParser(jsonData);
			this.messages.addMessages(parser, false);
//		}
		this.checkAndPushMessage();
	}

	/**
	 * メッセージの更新状況を確認し、必要あれば更新します。
	 */
	public synchronized void checkAndPushMessage(){
		long seq = this.messages.getMaxSeqNumber();

		Iterator<DrawChatSession> iterator = this.sessions.iterator();
		while(iterator.hasNext()){
			DrawChatSession session = iterator.next();

			if(session.getSeqNow() > seq){
				continue;
			}
			if(session.isTimeOver()){
				iterator.remove();
				continue;
			}
			session.pushMessage(this.messages.getMessages(session.getSeqNow()));
		}
	}
}
