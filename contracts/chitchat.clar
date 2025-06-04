;; ChitChat - Decentralized Messaging Protocol
;; A decentralized messaging system built on Stacks blockchain

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-unauthorized (err u102))

;; Data Variables
(define-map messages
    { message-id: uint }
    {
        sender: principal,
        content: (string-utf8 280),
        timestamp: uint,
        replies-to: (optional uint)
    }
)

(define-map user-messages
    { user: principal }
    { message-ids: (list 50 uint) }
)

(define-data-var message-counter uint u0)

;; Public Functions
(define-public (send-message (content (string-utf8 280)) (replies-to (optional uint)))
    (let
        (
            (message-id (+ (var-get message-counter) u1))
            (existing-messages (default-to (list) (get message-ids (map-get? user-messages {user: tx-sender}))))
        )
        (try! (assure-valid-reply replies-to))
        (map-set messages
            { message-id: message-id }
            {
                sender: tx-sender,
                content: content,
                timestamp: block-height,
                replies-to: replies-to
            }
        )
        (map-set user-messages
            { user: tx-sender }
            { message-ids: (unwrap-panic (as-max-len? (append existing-messages message-id) u50)) }
        )
        (var-set message-counter message-id)
        (ok message-id)
    )
)

(define-read-only (get-message (message-id uint))
    (ok (unwrap! (map-get? messages {message-id: message-id}) err-not-found))
)

(define-read-only (get-user-messages (user principal))
    (ok (default-to (list) (get message-ids (map-get? user-messages {user: user}))))
)

;; Private Functions
(define-private (assure-valid-reply (reply-to (optional uint)))
    (match reply-to
        reply-id (assure! (is-some (map-get? messages {message-id: reply-id})) err-not-found)
        (ok true)
    )
)
