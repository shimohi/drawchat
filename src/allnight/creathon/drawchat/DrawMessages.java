package allnight.creathon.drawchat;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;

import java.io.IOException;
import java.util.*;

/**
 * Created by saito on 2014/02/16.
 */
public class DrawMessages {

	/**
	 * 最大シーケンス番号
	 */
	private long MAX_SEQ_NUMBER = 0L;

	/**
	 * シーケンス番号でソート済のマップ
	 */
	private SortedMap<Long,DrawMessage> messageMap = Collections.synchronizedSortedMap(new TreeMap<Long, DrawMessage>());

	/**
	 * 指定されたシーケンス番号以上のメッセージを取得します。
	 * @param from
	 * @return
	 */
	public DrawMessage[] getMessages(long from){
		Collection<DrawMessage> messages =  this.messageMap.tailMap(from).values();
		return messages.toArray(new DrawMessage[messages.size()]);
	}

	/**
	 * メッセージを追加します。
	 * @param parser
	 * @param ignoreSeqNumber
	 * @throws IOException
	 */
	public void addMessages(JsonParser parser,boolean ignoreSeqNumber) throws IOException {

		JsonToken token = parser.getCurrentToken();
		if(token != JsonToken.START_ARRAY){
			return;
		}

		while (parser.nextToken() != JsonToken.END_ARRAY) {
			DrawMessage message = DrawMessage.parse(parser,this,ignoreSeqNumber);
			if(message == null){
				continue;
			}
			this.addMessage(message);
		}
	}

	/**
	 * メッセージを追加します。
	 * @param message
	 */
	public void addMessage(DrawMessage message){
		this.messageMap.put(message.getSeqNumber(),message);
	}

	/**
	 * @return 現在の最大シーケンス番号
	 */
	public long getMaxSeqNumber(){
		return this.MAX_SEQ_NUMBER;
	}

	/**
	 * @return 採番
	 */
	public synchronized final long getNewSeqNumber(){
		this.MAX_SEQ_NUMBER++;
		return this.MAX_SEQ_NUMBER;
	}
}
