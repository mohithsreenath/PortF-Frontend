import { useQueryClient } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { getMessages, markMessageRead, deleteMessage } from '../../api/admin'
import { Mail, MailOpen, Trash2 } from 'lucide-react'

export default function AdminMessages() {
  const qc = useQueryClient()
  const { data: messages = [] } = useQuery({ queryKey: ['messages'], queryFn: getMessages })
  const refresh = () => qc.invalidateQueries({ queryKey: ['messages'] })

  const unread = messages.filter(m => !m.is_read).length

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div>
          <p className="section-label">Admin</p>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Messages
            {unread > 0 && (
              <span className="ml-3 font-mono text-sm text-teal-400 bg-teal-400/10 border border-teal-400/20 px-2 py-0.5 rounded-full">
                {unread} new
              </span>
            )}
          </h1>
        </div>
      </div>

      <div className="space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-16 text-text-muted font-mono text-sm">No messages yet</div>
        )}
        {messages.map(msg => (
          <div key={msg.id} className={`card flex gap-4 ${!msg.is_read ? 'border-teal-400/20' : ''}`}>
            <div className="flex-shrink-0 mt-1">
              {msg.is_read
                ? <MailOpen size={16} className="text-text-muted" />
                : <Mail size={16} className="text-teal-400" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display text-sm font-semibold text-text-primary">{msg.name}</span>
                <span className="font-mono text-xs text-text-muted">{msg.email}</span>
                {!msg.is_read && <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />}
              </div>
              <p className="font-body text-sm text-text-secondary">{msg.message}</p>
              <div className="font-mono text-xs text-text-muted mt-2">
                {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              {!msg.is_read && (
                <button onClick={async () => { await markMessageRead(msg.id); refresh() }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-teal-400 hover:border-teal-400/40 transition-all">
                  <MailOpen size={13} />
                </button>
              )}
              <button onClick={async () => { if (!confirm('Delete?')) return; await deleteMessage(msg.id); refresh() }}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-muted hover:text-red-400 hover:border-red-400/40 transition-all">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}