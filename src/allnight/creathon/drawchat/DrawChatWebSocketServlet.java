package allnight.creathon.drawchat;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by saito on 2014/02/16.
 */
@WebServlet(urlPatterns={"/DrawServlet"})
public class DrawChatWebSocketServlet extends WebSocketServlet {

	private final static DrawChatThread thread = new DrawChatThread();

	@Override
	protected StreamInbound createWebSocketInbound(String s, HttpServletRequest httpServletRequest) {
		return new DrawChatSession(thread);
	}
}
