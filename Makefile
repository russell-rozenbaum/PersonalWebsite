PORT ?= 8000
HOST ?= 127.0.0.1

# LAN IP detection (macOS): try common Wi-Fi interfaces, fall back to ifconfig scan.
LAN_IP := $(shell \
  ipconfig getifaddr en0 2>/dev/null || \
  ipconfig getifaddr en1 2>/dev/null || \
  ifconfig | awk '/inet / && $$2 != "127.0.0.1" {print $$2; exit}')

.DEFAULT_GOAL := serve

.PHONY: serve lan open stop help

help:
	@echo "Targets:"
	@echo "  serve  - start a local server on http://$(HOST):$(PORT) (localhost only)"
	@echo "  lan    - start a server reachable on your LAN (for phone/other devices)"
	@echo "  open   - open the site in your default browser"
	@echo "  stop   - kill any process bound to PORT"
	@echo ""
	@echo "Override: make serve PORT=8080 HOST=0.0.0.0"

serve:
	@echo "Serving on http://$(HOST):$(PORT)  (Ctrl-C to stop)"
	@python3 -m http.server $(PORT) --bind $(HOST)

lan:
	@if [ -z "$(LAN_IP)" ]; then \
	  echo "Could not detect LAN IP. Is Wi-Fi connected?"; exit 1; \
	fi
	@echo ""
	@echo "  On this Mac:  http://localhost:$(PORT)"
	@echo "  On your LAN:  http://$(LAN_IP):$(PORT)"
	@echo ""
	@echo "  (Make sure your phone is on the same Wi-Fi network.)"
	@echo "  Ctrl-C to stop."
	@echo ""
	@python3 -m http.server $(PORT) --bind 0.0.0.0

open:
	@open "http://$(HOST):$(PORT)"

stop:
	@pids=$$(lsof -ti tcp:$(PORT) 2>/dev/null); \
	  if [ -n "$$pids" ]; then kill -9 $$pids && echo "Killed $$pids"; else echo "Nothing on port $(PORT)"; fi
