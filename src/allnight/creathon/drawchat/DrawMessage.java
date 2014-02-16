package allnight.creathon.drawchat;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.core.JsonParser;

import java.io.IOException;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Created by saito on 2014/02/16.
 */
public class DrawMessage {


	/**
	 * 定数：drawData
	 */
	public final static String DRAW_DATA = "drawData";

	/**
	 * 定数：updateDate
	 */
	public final static String UPDATE_DATE = "updateDate";

	/**
	 * 定数：userName
	 */
	public final static String USER_NAME = "userName";

	/**
	 * 定数：ipAddress
	 */
	public final static String IP_ADDRESS = "ipAddress";

	/**
	 * 定数：seq
	 */
	public final static String SEQ = "seq";

	/**
	 * 書き込みデータ
	 */
	private String drawData;

	/**
	 * 更新日付
 	 */
	private String updateDate;

	/**
	 * ユーザー名
	 */
	private String userName;

	/**
	 * IPアドレス
	 */
	private String ipAddress;

	/**
	 * シーケンス番号
	 */
	private long seqNumber;

	/**
	 * コンストラクタ
	 * @param userName
	 * @param ipAddress
	 * @param updateDate
	 * @param drawData
	 */
	public DrawMessage(
		String userName,
		String ipAddress,
		String updateDate,
		String drawData,
		long seq
	){
		this.userName = userName;
		this.ipAddress = ipAddress;
		this.updateDate = updateDate;
		this.drawData = drawData;
		this.seqNumber = seq;
	}

	/**
	 * @return シーケンス番号
	 */
	public long getSeqNumber(){
		return this.seqNumber;
	}

	/**
	 * JSONデータを出力します。
	 * @param generator
	 * @throws IOException
	 */
	public void writeJSON(JsonGenerator generator) throws IOException {
		generator.writeStartObject();
		generator.writeStringField(DRAW_DATA, this.drawData);
		generator.writeStringField(UPDATE_DATE,this.updateDate);
		generator.writeStringField(USER_NAME,this.userName);
		generator.writeStringField(IP_ADDRESS,this.ipAddress);
		generator.writeNumber(this.seqNumber);
		generator.writeEndObject();
	}

	public synchronized static DrawMessage parse(
		JsonParser parser,
		DrawMessages messages,
		boolean ignoreSeq
	) throws IOException {

		JsonToken token = parser.getCurrentToken();
		if(token != JsonToken.START_OBJECT){
			return null;
		}

		String drawData = "";
		String userName = "";
		String ipAddress = "";
		String updateDate = "";
		long seq = -1L;

		while (parser.nextToken() != JsonToken.END_OBJECT) {
			//
			String name = parser.getCurrentName();

			//drawData
			if(name.equals(DRAW_DATA)){
				drawData = parser.getText();
				continue;
			}

			//userName
			if(name.equals(USER_NAME)){
				userName = parser.getText();
				continue;
			}

			//ipAddress
			if(name.equals(IP_ADDRESS)){
				ipAddress = parser.getText();
				continue;
			}

			//updateDate
			if(name.equals(UPDATE_DATE)){
				updateDate = parser.getText();
				continue;
			}

			if(name.equals(SEQ) && !ignoreSeq){
				seq = parser.getLongValue();
			}
		}

		if(updateDate == null || updateDate.length()==0){

			Calendar cal = Calendar.getInstance();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
			updateDate = sdf.format(cal.getTime());
		}

		if(seq < 0){
			seq = messages.getNewSeqNumber();
		}
		return new DrawMessage(userName,ipAddress,updateDate,drawData,seq);
	}

}
